import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { MovieCard } from './Components/MovieCard';
import useDebouncer from './Components/useDebouncer';

const API_URL='https://www.omdbapi.com?apikey=c032e2d7';

function App() {

  const [search, setSearch] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [Loading,setLoading]=useState(false)
  
  // console.log('first',search)
  // console.log('movies',movies)

  const searchMovies=async(text)=>{
    try {
      setLoading(true)
      const resp=await fetch(`${API_URL}&s=${text}`)
      const data=await resp.json();
      setMovies(data.Search)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const debounceSearchValue = useDebouncer(search, 2000);
  // console.log('debounceSearchValue',debounceSearchValue)
  useEffect(()=>{
    if (debounceSearchValue){
      searchMovies(debounceSearchValue)
    }
  },[debounceSearchValue])

  return (
    <div className="app">
    <h1>MovieLand</h1>
    <div className="search">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for movies"
      />
      <img
        src={'https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg'}
        alt="search"
        onClick={() => searchMovies(search)}
      />
    </div>

    {Loading?<div className="empty"><h1>Loading...</h1></div>: (
      movies?.length>0 ?<div className="container">
        {movies?.map((movie) => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </div> : <h1>Data Not Found</h1>
    )}
  </div>
);
}

export default App;
