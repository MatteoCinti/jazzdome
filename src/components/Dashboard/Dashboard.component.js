import { useState, useEffect } from "react";

import Searchbar from "../Searchbar/Searchbar.component";
import SearchResults from "../SearchResults/SearchResults.component";

const Dashboard = ({ setPlayingTrack }) => { 
  const [ searchQuery, setSearchQuery ] = useState();
  const [ tracks, setTracks ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  // const [ uri, setUri ] = useState('');

  useEffect(() => {
    const fetchFromQuery = async () => { 
      const searchResults = await fetch(`/search/query/${searchQuery}`)
      const data = await searchResults.json()
      console.log(data.tracks)
      setTracks(data.tracks)
    }

    if(searchQuery) {
      fetchFromQuery()
    }
  }, [searchQuery])
  console.log(tracks)
  return (
    <>
      <Searchbar setSearchQuery={setSearchQuery} />

      <article className="results-container">
        {tracks.length > 0 && <SearchResults tracks={tracks} resultCategory='Tracks' setPlayingTrack={setPlayingTrack} /> }
        <h3 
          className='search-results__title'>
          {tracks.length > 0 
            ? 'Tracks' 
            : `Jazz
              drome`
          }
        </h3>

      </article>
    </>
  )
}

export default Dashboard;