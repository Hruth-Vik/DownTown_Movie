import React from 'react'
import "../assets/star.svg"
const MovieCard = ({movie: {title,vote_average,poster_path,release_date,original_language}}) => {
  return (
    <div className='movie-card'>
       {/* <p className='text-white'>{title}</p> */}

       <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: 
        `/no-movie.png`} alt={title}/>
    
        <div className='mt-4'>
            <h3 className='text-white'>{title}</h3>
        </div>
        <div className='content'>
            <div className='rating'>
                <img src="star.svg" alt="Star icon" />
                <p>{vote_average? vote_average.toFixed(1):'N/A'}</p>
            </div>
            <span>•</span>
            <p className='lang'>{original_language}</p>
            <span>•</span>
            <p className='year'>{release_date?release_date.split('-')[0]:'N/A'}</p>
        </div>
    </div>

  )
}

export default MovieCard
