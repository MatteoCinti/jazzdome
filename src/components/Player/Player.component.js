import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({accessToken, trackUri}) => { 
  const [play, setPlay] = useState(false);

  useEffect(() => { 
    setPlay(true)
  }, []);

  useEffect(() => { 
    setPlay(true)
  }, [trackUri]);

  if(!accessToken) return null;

  return (
    <SpotifyPlayer 
      uris={trackUri ? trackUri : []} 
      token={accessToken}
      play={play}
    />
  )
}

export default Player