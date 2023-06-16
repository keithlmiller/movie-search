import { connect } from "react-redux";
import {
  selectSavedMoviesById,
  selectSavedMoviesAllIds,
  selectSearchConfig,
} from "../../store/selectors";
import Movie from "../search/components/Movie";

function SavedMovies({ savedMoviesById, savedMovies, searchConfig }) {
  return (
    <>
      Saved Movies
      <div>
        {savedMovies?.map((movieId) => {
          const movie = savedMoviesById[movieId];
          if (movie) {
            return (
              <Movie
                key={movie.id}
                movie={movie}
                isSaved={true}
                baseUrl={searchConfig.images?.base_url}
                imageSize={
                  searchConfig.images?.poster_sizes[2]
                    ? searchConfig.images?.poster_sizes[2]
                    : searchConfig.images?.poster_sizes[0]
                }
              />
            );
          }

          return <></>;
        })}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  savedMoviesById: selectSavedMoviesById(state),
  savedMovies: selectSavedMoviesAllIds(state),
  searchConfig: selectSearchConfig(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMovies);
