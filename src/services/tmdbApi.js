const API_BASE_URL = "https://api.themoviedb.org/3";

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w342";

export async function searchMovies(query) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.",
    );
  }

  const searchParams = new URLSearchParams({
    api_key: apiKey,
    query: query,
    language: "en-US",
    include_adult: "false",
    page: "1",
  });

  const response = await fetch(
    `${API_BASE_URL}/search/movie?${searchParams.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve movie data from TMDB.");
  }

  const data = await response.json();

  return data.results || [];
}
