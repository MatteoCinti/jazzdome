const PlayingTrackHeader = ({ title, artists}) => (

  <header className='playing-track'>
    <span className='playing-track__animate'>
      <h6 className='playing-track__header'>Now Playing</h6>
      <h4 className='playing-track__title'>{title}</h4>
      <h4 className='playing-track__artists'>{artists.map(artist => artist.name).join(', ')}</h4>
    </span>
  </header>
)

export default PlayingTrackHeader;