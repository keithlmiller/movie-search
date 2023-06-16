const DB_NAME = "savedMoviesDB";

export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("savedMovies")) {
        db.createObjectStore("savedMovies", { keyPath: "id" });
      }
    };

    request.onerror = (event) => {
      console.error("Failed to open database", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
  });
}
