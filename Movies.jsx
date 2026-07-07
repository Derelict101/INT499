import { useState } from "react";
import { POSTER_BASE_URL, searchMovies } from "../services/tmdbApi.js";

function Movies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleMovieSearch(event) {
    event.preventDefault();

    const cleanedSearchTerm = searchTerm.trim();

    if (!cleanedSearchTerm) {
      setMovieResults([]);
      setHasSearched(false);
      setErrorMessage("Please enter a movie title.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setHasSearched(true);

    try {
      const results = await searchMovies(cleanedSearchTerm);
      setMovieResults(results);
    } catch (error) {
      setMovieResults([]);
      setErrorMessage(
        error?.message ||
          String(error) ||
          "Something went wrong while searching TMDB.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="moviesPage">
      <section className="introCard">
        <p className="smallLabel">TMDB API Search</p>

        <h2>Movie Search</h2>

        <p>
          Search for movie information directly from The Movie Database API.
          Results include the movie poster, title, release year, rating, and
          overview.
        </p>
      </section>

      <section className="formCard">
        <div className="sectionHeader">
          <span className="material-symbols-outlined">search</span>

          <div>
            <h2>Find Movie Information</h2>
            <p>Enter a movie title to retrieve information from TMDB.</p>
          </div>
        </div>

        <form className="movieSearchForm" onSubmit={handleMovieSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Example, The Matrix"
          />

          <button className="primaryButton" type="submit">
            <span className="material-symbols-outlined">movie_search</span>
            Search TMDB
          </button>
        </form>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </section>

      <section className="movieResultsPanel">
        <div className="listHeader">
          <div>
            <p className="smallLabel">Retrieved API Information</p>
            <h2>Search Results</h2>
          </div>
        </div>

        {isLoading && (
          <div className="emptyState">
            <span className="material-symbols-outlined">hourglass_top</span>
            <h3>Searching TMDB...</h3>
            <p>Please wait while movie information is retrieved.</p>
          </div>
        )}

        {!isLoading &&
          hasSearched &&
          movieResults.length === 0 &&
          !errorMessage && (
            <div className="emptyState">
              <span className="material-symbols-outlined">search_off</span>
              <h3>No movies found.</h3>
              <p>Try searching for a different title.</p>
            </div>
          )}

        {!isLoading && movieResults.length > 0 && (
          <div className="movieGrid">
            {movieResults.map((movie) => {
              const releaseYear = movie.release_date
                ? movie.release_date.slice(0, 4)
                : "N/A";

              return (
                <article className="movieCard" key={movie.id}>
                  {movie.poster_path ? (
                    <img
                      src={`${POSTER_BASE_URL}${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                    />
                  ) : (
                    <div className="missingPoster">
                      <span className="material-symbols-outlined">
                        image_not_supported
                      </span>
                      <p>No Poster</p>
                    </div>
                  )}

                  <div className="movieCardBody">
                    <h3>{movie.title}</h3>

                    <p className="movieMeta">
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                      {releaseYear}
                    </p>

                    <p className="movieMeta">
                      <span className="material-symbols-outlined">star</span>
                      Rating,{" "}
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </p>

                    <p className="movieOverview">
                      {movie.overview ||
                        "No overview is available for this movie."}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}

export default Movies;
