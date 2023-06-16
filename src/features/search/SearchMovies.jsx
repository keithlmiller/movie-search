import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Button, Input, SimpleGrid, Spinner } from "@chakra-ui/react";
import { searchMovies } from "../../api/searchMovies";
import { setSavedSearchTerm, setSearchedMovies } from "../../store/actions";
import {
  selectSavedMoviesById,
  selectSavedMoviesAllIds,
  selectSearchConfig,
  selectSearchTerm,
  selectSearchedMovies,
} from "../../store/selectors";
import MovieResult from "../../components/Movie/MovieListItem";

function SearchMovies({
  savedMoviesById,
  searchTerm: prevSearchTerm,
  searchConfig,
  searchedMovies,
  setSavedSearchTerm,
  setSearchedMovies,
}) {
  const [searchTerm, setSearchTerm] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const handlePageChange = () => {
    (async () => {
      try {
        const data = await searchMovies(searchTerm, page + 1);
        setSearchedMovies([...searchedMovies, ...data.results]);
      } catch (e) {
        console.error(e);
      }
    })();
    setPage(page + 1);
  };

  useEffect(() => {
    let timerId;

    const handleSearch = () => {
      if (searchTerm?.length) {
        setSearchParams({ query: searchTerm });
        setSavedSearchTerm(searchTerm);
      } else if (searchTerm !== null) {
        setSearchParams();
        setSavedSearchTerm(searchTerm);
        setSearchedMovies([]);
        setTotalPages(0);
      }
      setPage(1);
    };

    const debounceSearch = () => {
      clearTimeout(timerId);
      timerId = setTimeout(handleSearch, 300);
    };

    debounceSearch();

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (searchedMovies?.length && searchTerm && !searchTerm.length) {
      // setResults([]);
      setSearchedMovies([]);
      setTotalPages(0);
    }
  }, [searchedMovies, searchTerm]);

  useEffect(() => {
    if (searchTerm === null && prevSearchTerm?.length) {
      setSearchTerm(prevSearchTerm);
    }
  }, [searchTerm, prevSearchTerm]);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query === prevSearchTerm && searchedMovies.length) return;

    if (query?.length) {
      (async () => {
        try {
          setLoadingSearch(true);
          const data = await searchMovies(query, 1);
          setLoadingSearch(false);

          setTotalPages(data.total_pages);
          setSearchedMovies(data.results);
        } catch (e) {
          setTotalPages(0);
          setSearchedMovies([]);

          // TODO: handle this with visible error message
          console.error(e);
        }
      })();
    }
  }, [searchParams]);

  return (
    <Box>
      <Box mb={5}>
        <Input
          size="lg"
          type="text"
          placeholder="Search by Movie Title"
          onChange={handleSearchChange}
          value={searchTerm || ""}
          alt="Type to seach by movie title"
        />
      </Box>

      <Box>
        {loadingSearch ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={2} spacing={10}>
            {searchedMovies?.map((result) => (
              <MovieResult
                key={result.id}
                movie={result}
                isSaved={Boolean(savedMoviesById[result.id])}
                baseUrl={searchConfig.images?.base_url}
                imageSize={
                  searchConfig.images?.poster_sizes[2]
                    ? searchConfig.images?.poster_sizes[2]
                    : searchConfig.images?.poster_sizes[0]
                }
              />
            ))}
          </SimpleGrid>
        )}

        {totalPages > 1 && (
          <Button m={5} onClick={handlePageChange}>
            See More
          </Button>
        )}
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  savedMoviesById: selectSavedMoviesById(state),
  savedMovies: selectSavedMoviesAllIds(state),
  searchTerm: selectSearchTerm(state),
  searchedMovies: selectSearchedMovies(state),
  searchConfig: selectSearchConfig(state),
});

const mapDispatchToProps = {
  setSavedSearchTerm,
  setSearchedMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovies);
