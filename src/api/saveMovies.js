import { openDatabase } from "./indexedDB";

export const removeMovie = (movieId) => async (dispatch) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(["savedMovies"], "readwrite");
    const objectStore = transaction.objectStore("savedMovies");
    const request = objectStore.delete(movieId);
    request.onerror = (event) => {
      console.error(
        "Failed to remove movie from IndexedDB",
        event.target.error
      );
    };
    transaction.oncomplete = () => {
      dispatch({
        type: "REMOVE_SAVED_MOVIE",
        payload: movieId,
      });
    };
  } catch (error) {
    console.error("Failed to open IndexedDB", error);
  }
};

export const saveMovie = (movie) => async (dispatch) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(["savedMovies"], "readwrite");
    const objectStore = transaction.objectStore("savedMovies");
    const request = objectStore.add(movie);
    request.onerror = (event) => {
      console.error("Failed to save movie to IndexedDB", event.target.error);
    };
    transaction.oncomplete = () => {
      dispatch({
        type: "ADD_SAVED_MOVIE",
        payload: movie,
      });
    };
  } catch (error) {
    console.error("Failed to open IndexedDB", error);
  }
};

export const fetchSavedMovies = () => async (dispatch) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(["savedMovies"], "readonly");
    const objectStore = transaction.objectStore("savedMovies");
    const request = objectStore.getAll();
    request.onerror = (event) => {
      console.error(
        "Failed to fetch saved movies from IndexedDB",
        event.target?.error
      );
    };
    request.onsuccess = (event) => {
      dispatch({
        type: "FETCH_ALL_SAVED_MOVIES",
        payload: event.target?.result || [],
      });
    };
  } catch (error) {
    console.error("Failed to open IndexedDB", error);
  }
};
