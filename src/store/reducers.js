const initialState = {
  savedMoviesById: [],
  savedMovies: {
    byId: {},
    allIds: [],
  },
  searchConfig: {},
  searchTerm: "",
  searchedMovies: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SAVED_MOVIE": {
      const movie = action.payload;

      return {
        ...state,
        savedMovies: {
          byId: {
            ...state.savedMovies.byId,
            [movie.id]: movie,
          },
          allIds: [...state.savedMovies.allIds, movie.id],
        },
      };
    }

    case "REMOVE_SAVED_MOVIE": {
      const movieId = action.payload;
      const updatedMoviesById = { ...state.savedMovies.byId };

      delete updatedMoviesById[movieId];

      const updatedMoviesAllIds = [...Object.keys(updatedMoviesById)];

      return {
        ...state,
        savedMovies: {
          byId: updatedMoviesById,
          allIds: updatedMoviesAllIds,
        },
      };
    }

    case "FETCH_ALL_SAVED_MOVIES": {
      const movies = action.payload;

      // consider using normalizr here
      const fetchedwMoviesById = movies?.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      const fetchedMoviesIds = movies?.map((movie) => movie.id);

      return {
        ...state,
        savedMovies: {
          byId: fetchedwMoviesById,
          allIds: fetchedMoviesIds,
        },
      };
    }

    case "SET_SEARCH_CONFIG":
      return {
        ...state,
        searchConfig: action.payload,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_SEARCHED_MOVIES":
      return {
        ...state,
        searchedMovies: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
