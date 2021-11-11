import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login.component'
import Dashboard from './components/Dashboard/Dashboard.component'
import Player from "./components/Player/Player.component";


function App() {

  const [token, setToken] = useState('');
  const [tokenExpiresIn, setTokenExpiresIn] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [playingTrack, setPlayingTrack] = useState(null);


  useEffect(() => {
    async function getToken() {
      const response = await fetch('/auth/token').catch((err) => console.error(err));
      const json = await response.json();
      setToken(json.access_token);
      setTokenExpiresIn(json.expires_in);
      setRefreshToken(json.refresh_token);
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

  }, [token])
  

  return (
    <main className="app">
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
