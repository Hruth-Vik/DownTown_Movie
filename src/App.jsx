
import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';


const API_BASE_URL='https://api.themoviedb.org/3';
const API_KEY=import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS={
  method:'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {
  const [searchTerm, setsearchTerm] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setmovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


    const fetchMovies= async()=>{
      setIsLoading(true);
      setErrorMessage('');
      try{
        const endpoint= `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        const response=await fetch(endpoint,API_OPTIONS);
        if(!response.ok){
          throw new Error('Failed to fetch the data');
        }
        const data=await response.json();
        if(data.Response==='False')
          {
              setErrorMessage(data.Error||"Failed to fetch movies");
              setMovieList([]);
              return;
          } 
          setmovieList(data.results || []);
      }
      catch(error){
        console.error(`ERROR FETCHING MOVIES:${error}`);
        setErrorMessage('ERROR FETCHING MOVIES.');
      }finally{
          setIsLoading(false);
      }
    }

  useEffect(()=>{
    fetchMovies();
  },[])

  return (
    <>
      <main>
      <div className='pattern'/>
      <div className="wrapper"> 
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Latest</span> trending Movies</h1>
        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All movies</h2>
          {isLoading?(
            <Spinner/>
          ):errorMessage?(
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movieList.map((movie)=>(
               <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
      </main>
    </>
  )
}

export default App
