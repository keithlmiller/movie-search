export const addSavedMovie = (movie) => ({
  type: "ADD_SAVED_MOVIE",
  payload: movie,
});

export const removeSavedMovie = (movieId) => ({
  type: "REMOVE_SAVED_MOVIE",
  payload: movieId,
});

export const setSearchConfig = (config) => ({
  type: "SET_SEARCH_CONFIG",
  payload: config,
});

export const setSavedSearchTerm = (term) => {
  return {
    type: "SET_SEARCH_TERM",
    payload: term,
  };
};

export const setSearchedMovies = (movies) => ({
  type: "SET_SEARCHED_MOVIES",
  payload: movies,
});
