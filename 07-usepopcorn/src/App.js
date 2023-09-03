import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const theKey = '6e4b7af9';

////////////////////////////// [index.js] ← App //////////////////////////////
export default function App() {
  const [query, setQuery] = useState("Terminator");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /*
  useEffect(function() {
    console.log('After initial render')
  }, [])

  useEffect(function() {
    console.log('After every render')
  })

  useEffect(function(){
    console.log('When the "query" is re-render');
  },[query])

  console.log('During Render')
  */
  function handleSelectMovie(id){
    if(id === selectedId)
    {
      setSelectedId(null)
    }else
    {
      setSelectedId(id)
    }
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  useEffect(function() 
  {
    async function fetchMovies()
    {
      try{
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://www.omdbapi.com/?apikey=${theKey}&s=${query}`);
        
        if(!res.ok) throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if(data.Response === 'False') throw new Error("Movie not found");
  
        setMovies(data.Search);
      }
      catch (err) {
        console.error(err.message);
        setError(err.message);
      }
      finally{
        setIsLoading(false);
      }
    }

    if(query.length < 2){
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies()
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies}/>
      </NavBar>

      <Main>      
        <Box>
          {isLoading && <Loader/>}
          {(!isLoading && !error) && <MoiveList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>

        <Box>  
          {
            
              selectedId ? (
              <>
                <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie}/> 
              </>
              ) : (
              <>
                <WatchedSummary watched={watched}/>
                <WatchedMoiveList watched={watched}/>
              </>
              )
          }
        </Box>
      </Main>
    </>
  )
}


////////////////////////////// App ← Loader //////////////////////////////
function Loader(){
  return(
    <p className="loader">Now Loading...</p>
  )
}

function ErrorMessage({message}){
  return(
    <p className="error">
      <span>⛔</span> {message}
    </p>
  )
}

////////////////////////////// App ← NavBar //////////////////////////////
function NavBar({children}){

  return (      
    <nav className="nav-bar">
      {children}
    </nav>
  )
}


////////////////////////////// App ← NavBar ← Logo //////////////////////////////
function Logo(){
    return(      
      <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
      </div>
  )
}


////////////////////////////// App ← NavBar ← Search //////////////////////////////
function Search({query, setQuery}){
  return(
      <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}


////////////////////////////// App ← NavBar ← NumResult //////////////////////////////
function NumResult({movies}){
  return(
    <p className="num-results">
    Found <strong>{movies.length}</strong> results
    </p>
  )
}


////////////////////////////// App ← Main //////////////////////////////
function Main({children}){
  return(
    <main className="main">
      {children}
    </main>
  )
}


////////////////////////////// App ← Main ← Box //////////////////////////////
function Box({children}) {
  
  const [isOpen, setIsOpen] = useState(true);

  return(
    <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>

      {isOpen && children}

  </div>
  )
}

////////////////////////////// App ← Main ← ListBox ← MoiveList //////////////////////////////
function MoiveList({movies, onSelectMovie}) {
  return(
    <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
        ))}
      </ul>
  )
}

////////////////////////////// App ← Main ← ListBox ← MoiveList ← Moive //////////////////////////////
function Movie({movie, onSelectMovie}) {
  return(
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function MovieDetails({selectedId, onCloseMovie}) {
  return(
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
      {selectedId}
    </div>
  )
}

////////////////////////////// App ← Main ← WatchedBox ← WatchedSummary //////////////////////////////
function WatchedSummary({watched}) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return(
    <div className="summary">
          <h2>Movies you watched</h2>
          <div>
            <p>
              <span>#️⃣</span>
              <span>{watched.length} movies</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{avgImdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{avgUserRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{avgRuntime} min</span>
            </p>
          </div>
        </div>
  )
}


////////////////////////////// App ← Main ← WatchedBox ← WatchedMoiveList //////////////////////////////
function WatchedMoiveList({watched}){
  return(
    <ul className="list">
          {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.imdbID}/>
          ))}
        </ul>
  )
}


////////////////////////////// App ← Main ← WatchedBox ← WatchedMoiveList ← WatchedMoive //////////////////////////////
function WatchedMovie({movie}) {
  return(
      <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}