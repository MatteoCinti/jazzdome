import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login.component'
import Dashboard from './components/Dashboard/Dashboard.component'
import Player from "./components/Player/Player.component";
import PlayingTrackHeader from "./components/PlayingTrackHeader/PlayingTrackHeader.component";
import TrackCover from "./components/TrackCover/TrackCover.component";


function App() {

  const [token, setToken] = useState('');
  const [tokenExpiresIn, setTokenExpiresIn] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [playingTrack, setPlayingTrack] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try{
        const response = await fetch('/auth/token')
        const json = await response.json();
        setToken(json.access_token);
        setTokenExpiresIn(json.expires_in);
        setRefreshToken(json.refresh_token);
      } catch (err) {
        console.error(err)
      }
    }

    getToken();
  }, []);
  
  useEffect(() => {
    let refreshTokenTimeout = setTimeout(() => { 
      async function refreshToken() {
        const response = await fetch('/auth/token').catch((err) => console.error(err));
        const json = await response.json();
        setToken(json.access_token);
        setTokenExpiresIn(json.expires_in);
        setRefreshToken(json.refresh_token);
      }
      refreshToken();


      return () => {
        clearTimeout(refreshTokenTimeout);
      };

    }, tokenExpiresIn)


    const getTrack = async () => {
      try{
        const startTrackId = '4zxd4tiXPlWMqoJltbVTbE'
        const response = await fetch('/search/track', { 
          headers: { 
            'Content-Type': 'application/json',
            'trackId': startTrackId
          }
        })
        const track = await response.json();
        setPlayingTrack(track);
      } catch (err) {
        console.error(err)
      }
    }

    token !== '' && getTrack();

  }, [token])
  

  return (
    <main className="app">

      { playingTrack && <PlayingTrackHeader title={playingTrack.name} artists={playingTrack.artists}/> }

      { playingTrack && <TrackCover src={playingTrack.album.images[0].url} /> }

      { (token === '') ? <Login/> : <Dashboard token={token} setPlayingTrack={setPlayingTrack}/> }
      <article className='player'>
        <Player 
          trackUri={playingTrack ? playingTrack.uri : null} 
          accessToken={token} 
        />
      </article>
    </main>
  );
}

export default App;
