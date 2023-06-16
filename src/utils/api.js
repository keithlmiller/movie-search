const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = import.meta.env.VITE_MOVIE_API_KEY;

export async function searchMovies(searchTerm, page) {
  const url = `${baseUrl}search/movie`;
  try {
    const response = await fetch(
      `${url}?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
        searchTerm
      )}&page=${page}&include_adult=false`
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("API call failed to search for movies");
    }
  } catch (e) {
    throw new Error("There was an unexpected error while searching movies");
  }
}

export async function getConfig() {
  const url = `${baseUrl}configuration`;
  try {
    const response = await fetch(`${url}?api_key=${apiKey}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("API call failed to fetch search config");
    }
  } catch (e) {
    throw new Error(
      "There was an unexpected error while fetching the search config"
    );
  }
}
