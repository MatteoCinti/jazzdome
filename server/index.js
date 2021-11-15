require('dotenv').config()
const express = require('express')
const cors = require("cors")
const request = require('request');
const axios = require('axios');

const port = 5000

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

let access_token = '';
let expires_in = ''
let refresh_token = ''

const app = express();
app.use(cors())

const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/auth/login', (req, res) => {

  const scope = "streaming \
               user-read-email \
               user-read-private \
               user-read-playback-state \
               user-modify-playback-state"

  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: "http://localhost:3000/auth/callback",
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})


app.get('/auth/callback', (req, res) => {

  const code = req.query.code;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: "http://localhost:3000/auth/callback",
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      expires_in = body.expires_in;
      refresh_token = body.refresh_token;
      res.redirect('/')
    }
  });
});

app.use('/auth/refreshToken', (req, res) => { 
  const refresh_token = req.query.refresh_token;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      expires_in = body.expires_in;
      refresh_token = body.refresh_token;
      res.redirect('/')
    }
  });
})


app.use('/auth/token', (req, res) => {
  res.json(
    {
      access_token: access_token,
      expires_in: expires_in,
      refresh_token: refresh_token
    })
})

app.get('/search/track', async (req, res) => {
  try {
    const trackId = req.headers.trackid

    const data = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      }
    })
    res.json(data.data)
  } catch (e){
    console.error(e)
    res.json({
      error: 'No tracks founs'
    })
  }

})

app.get('/search/query/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const data = await axios.get(`https://api.spotify.com/v1/search?q=${query.toLowerCase()}&type=album,track`, {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      }
    })
    const results = {
      tracks : data.data.tracks.items,
      albums : data.data.albums.items
    }

    if(results.tracks.length === 0) {
     throw new Error('No tracks found')
    }

    res.json(results)  
  } catch (e){
    console.error(e)
    res.status(400).json({ 
      error: e.message
    })
  }
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
