import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({accessToken, trackUri}) => { 
  const [play, setPlay] = useState(false);
  useEffect(() => { 
    setPlay(true)
  }, [trackUri]);

  if(!accessToken) return null;

  return (
    <SpotifyPlayer 
      uris={trackUri ? trackUri : []} 
      token={accessToken}
      play={play}
      callback={(state => { 
        if(!state.isPlaying) setPlay(false);
      })}
    />
  )
}

export default Player