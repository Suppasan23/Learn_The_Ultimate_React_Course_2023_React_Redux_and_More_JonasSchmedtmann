import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const theKey = "6e4b7af9";

////////////////////////////// [index.js] ← App //////////////////////////////
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue);
  });
  //const [watched, setWatched] = useState([]);

  function handleSelectMovie(id) {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched((watched)=>[...watched, movie]);

    //localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(deleteId){
    setWatched((eachWatched) => eachWatched.filter((eachMovie) => eachMovie.imdbID !== deleteId))
  }


  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  },[watched])


  useEffect(() => {
    const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${theKey}&s=${query}`, {signal: controller.signal}
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          
          if(err.name !== "AbortError"){
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function(){ // Return Clean-up data fetching
        controller.abort();
      };
  },[query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoiveList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <>
              <MovieDetails
                key={selectedId}
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched = {watched}
              />
            </>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoiveList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

////////////////////////////// App ← Loader //////////////////////////////
function Loader() {
  return <p className="loader">Now Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

////////////////////////////// App ← NavBar //////////////////////////////
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

////////////////////////////// App ← NavBar ← Logo //////////////////////////////
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

////////////////////////////// App ← NavBar ← Search //////////////////////////////
function Search({ query, setQuery }) {

  const inputEl = useRef(null)

  useEffect(()=>{
    function callback(e)
    {

      if(document.activeElement === inputEl.current) return;

      if(e.code === "Enter")
      {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback); //Clean-up function

  }, [setQuery]);

  /*useEffect(()=>{
    const el = document.querySelector(".search");
    console.log(el);
    el.focus();
  }, []);*/

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

////////////////////////////// App ← NavBar ← NumResult //////////////////////////////
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

////////////////////////////// App ← Main //////////////////////////////
function Main({ children }) {
  return <main className="main">{children}</main>;
}

////////////////////////////// App ← Main ← Box //////////////////////////////
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

////////////////////////////// App ← Main ← ListBox ← MoiveList //////////////////////////////
function MoiveList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

////////////////////////////// App ← Main ← ListBox ← MoiveList ← Moive //////////////////////////////
function Movie({ movie, onSelectMovie }) {
  return (
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
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {

  const [movie, setMoive] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((eachWatched) => eachWatched.imdbID).includes(selectedId);
  const watchedRatedMovie = watched.find((eachWatched) => eachWatched.imdbID === selectedId);
  const watchedRatedMovieRating = watchedRatedMovie?.userRating;


  const {
    Title: title, 
    Year: year, 
    Poster: poster, 
    Runtime: runtime, 
    imdbRating, 
    Plot: plot, 
    Released: released, 
    Actors: actors,
    Director: director,
    Genre: genre 
  } = movie;


  //if (imdbRating > 8) [isTop, setIsTop] = useState(true);
  //if(imdbRating > 8) return <p>Greatest Ever!</p>;

  /*const [isTop, setIsTop] = useState(imdbRating > 8);
  console.log(isTop);

  useEffect(() => {
    function imdbUpdate()
    {
      setIsTop(imdbRating > 8)
    }
    imdbUpdate()
  },[imdbRating])*/

  const isTop = imdbRating > 8;
  console.log(isTop);

  //const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating,
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newWatchMovie);
    onCloseMovie();

    //setAvgRating(Number(imdbRating));
    //setAvgRating((a) => a = (a + userRating)/2)

  }


  useEffect(() =>{
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${theKey}&i=${selectedId}`);
      const data = await res.json();
      setMoive(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);


  useEffect(() =>{
    if(!title) return;
    document.title = `Movie | ${title}`;

    return function() {  // return Clean-up function
      document.title = "usePopcorn"
    }
  }, [title]);
  

  useEffect(() => {
    function callback(e) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }
  
    document.addEventListener('keydown', callback); //แอด EventListener ทุกครั้ง
  
    return () => {
      document.removeEventListener('keydown', callback); //ต้อง รีมูฟ EventListener ออกให้หมดทุกครั้ง
    };
  }, [onCloseMovie]);
  
  return (
    <div className="details">
      {isLoading ? (<Loader />
      ) : (
      <>
        <headers>

        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>

        <img src={poster} alt={`Poster of ${title}`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released}</p>
          <p>{genre}</p>
          <p><span>⭐</span>{imdbRating} imdb Rating</p>
        </div>

        </headers>

        {/*<p>{avgRating}</p>*/}

        <section>

          <div className="rating">

            {!isWatched ? 
            (<>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>

              {userRating > 0 ? 
                (
                <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
                ) : (
                <button disabled>+ Add to list</button>
                )
              }
            </>
            ) : (
            <>
              <p>You rated with movie {watchedRatedMovieRating} <span>⭐</span></p>
            </>
            )}
          </div>

          <p><em>{plot}</em></p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>

        </section>
      </>)
      } 
    </div>
  );
}

////////////////////////////// App ← Main ← WatchedBox ← WatchedSummary //////////////////////////////
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

////////////////////////////// App ← Main ← WatchedBox ← WatchedMoiveList //////////////////////////////
function WatchedMoiveList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>
      ))}
    </ul>
  );
}

////////////////////////////// App ← Main ← WatchedBox ← WatchedMoiveList ← WatchedMoive //////////////////////////////
function WatchedMovie({ movie, onDeleteWatched}) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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

        <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}