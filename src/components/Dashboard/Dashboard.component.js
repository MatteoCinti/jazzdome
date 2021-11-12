import { useState, useEffect } from "react";

import Searchbar from "../Searchbar/Searchbar.component";
import SearchResults from "../SearchResults/SearchResults.component";
import ErrorCard from "../ErrorCard/ErrorCard.component";

const Dashboard = ({ setPlayingTrack }) => { 
  const [ searchQuery, setSearchQuery ] = useState();
  const [ tracks, setTracks ] = useState([]);
  const [ albums, setAlbums ] = useState([]);
  const [ hasErrored, setHasErrored ] = useState(false);
  // const [ uri, setUri ] = useState('');

  useEffect(() => {
    const fetchFromQuery = async () => { 
      try {
        const data = await fetch(`/search/query/${searchQuery}`)
        const searchResults = await data.json()
        if(searchResults.error) {
          return setHasErrored(true)
        }
        return setTracks(searchResults.tracks)
      } catch(e) {
        console.log('error')
      }
    }

    if(searchQuery) {
      fetchFromQuery()
    }
  }, [searchQuery])
  
  return (
    <>
      <Searchbar setSearchQuery={setSearchQuery} />

      <article className="results-container">
        {hasErrored && <ErrorCard message='Sorry, no results where found for your query.' />}
        {!hasErrored && <SearchResults tracks={tracks} resultCategory='Tracks' setPlayingTrack={setPlayingTrack} /> }
        <h3 
          className='search-results__title'>
          {tracks.length > 0 
            ? 'Tracks' 
            : `Jazz
              dome`
          }
        </h3>

      </article>
    </>
  )
}

export default Dashboard;