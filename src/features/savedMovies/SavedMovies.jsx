import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import {
  selectSavedMoviesById,
  selectSavedMoviesAllIds,
  selectSearchConfig,
} from "../../store/selectors";
import Movie from "../../components/Movie";

function SavedMovies({ savedMoviesById, savedMovies, searchConfig }) {
  return (
    <>
      <Heading as="h2" size="lg" pb={4}>
        Saved Movies
      </Heading>
      <div>
        <SimpleGrid columns={2} spacing={10}>
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
        </SimpleGrid>
      </div>
    </>
  );
}

SavedMovies.propTypes = {
  savedMoviesById: PropTypes.object.isRequired,
  savedMovies: PropTypes.arrayOf(PropTypes.number).isRequired,
  searchConfig: PropTypes.shape({
    images: PropTypes.shape({
      poster_sizes: PropTypes.arrayOf(PropTypes.string),
      base_url: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state) => ({
  savedMoviesById: selectSavedMoviesById(state),
  savedMovies: selectSavedMoviesAllIds(state),
  searchConfig: selectSearchConfig(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMovies);
