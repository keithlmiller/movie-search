import React from "react";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  Link as RouterLink,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Link,
  Spinner,
  Tabs,
  Tab,
  TabList,
} from "@chakra-ui/react";
import SavedMovies from "./features/savedMovies/SavedMovies";
import SearchMovies from "./features/search/SearchMovies";
import { getConfig } from "./api/searchMovies";
import { fetchSavedMovies } from "./api/saveMovies";
import { setSearchConfig } from "./store/actions";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ConnectedLayout />}>
        <Route path="search" element={<SearchMovies />} />
        <Route path="saved" element={<SavedMovies />} />

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function NoMatch() {
  return <h3>Page Does not Exist</h3>;
}

function Layout({ fetchSavedMovies, setBaseSearchConfig }) {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    (async () => {
      try {
        setLoadingConfig(true);
        const config = await getConfig();
        setBaseSearchConfig(config);
        setLoadingConfig(false);

        await fetchSavedMovies();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === "/saved") {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [location.pathname]);

  if (tabIndex === null || loadingConfig) return <Spinner />;

  return (
    <Box minW="xl" minHeight="100vh">
      <Heading
        pt={15}
        as="h1"
        size="xl"
        pb={4}
        mt={4}
        fontStyle="italic"
        textDecor="overline"
      >
        Savr
      </Heading>
      <Tabs
        align="center"
        index={tabIndex}
        onChange={handleTabsChange}
        isFitted
      >
        <Box maxW="lg" mx="auto" mb={10}>
          <TabList>
            <Link
              _hover={{
                textDecoration: "none",
              }}
              width="100%"
              as={RouterLink}
              to="/search"
            >
              <Tab width="100%">Search</Tab>
            </Link>

            <Link
              _hover={{
                textDecoration: "none",
              }}
              width="100%"
              as={RouterLink}
              to="/saved"
            >
              <Tab width="100%">Saved</Tab>
            </Link>
          </TabList>
        </Box>
      </Tabs>
      <Outlet />
    </Box>
  );
}

Layout.propTypes = {
  fetchSavedMovies: PropTypes.func.isRequired,
  setBaseSearchConfig: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchSavedMovies,
  setBaseSearchConfig: setSearchConfig,
};

const ConnectedLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default App;
