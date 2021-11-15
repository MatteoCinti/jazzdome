import { useEffect } from 'react'
const Card = ({ data, setPlayingTrack }) => { 
  const imgUrl = data.album.images[1].url || data.album.images[0].url

  return (
    <div className="card" onClick={() => setPlayingTrack(data)}>
      <img className="card__img" src={imgUrl} />
      <div className="card__meta"> 
        <p className='card__title'>{data.name}</p>
        <p className='card__author'>{data.artists.map(artist => artist.name).join(', ')}</p>
      </div> 
    </div> 
  )
}

export default Card;