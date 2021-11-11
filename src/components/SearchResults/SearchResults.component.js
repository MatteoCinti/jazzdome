import Card from '../Card/Card.component'

const SearchResults = ({ tracks, resultCategory, setPlayingTrack }) => {
  console.log(tracks)
  return (
    <section className="search-results">

      {tracks.map((result, i) => ( 
        <Card data={result} setPlayingTrack={setPlayingTrack} key={i}/>
      ))}
      
    </section>
  )
}

export default SearchResults;