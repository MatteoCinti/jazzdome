import React, { useState, useEffect } from 'react';
import WebPlayback from './WebPlayback'
import Login from './Login'
import './App.css';

function App() {

  const [token, setToken] = useState('');
  console.log(token)
  useEffect(() => {

    async function getToken() {
      const response = await fetch('/auth/token').catch((err) => console.error(err));
      const json = await response.json();
      setToken(json.access_token);
      console.log('frontEND', json.access_token);
    }

    getToken();

  }, []);

  return (
    <>
        { (token === '') ? <Login/> : <WebPlayback token={token} /> }
    </>
  );
}

export default App;
