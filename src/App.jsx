import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Outlet, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Box, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import SavedMovies from "./features/savedMovies/SavedMovies";
import SearchMovies from "./features/search/SearchMovies";
import { getConfig } from "./utils/api";
import { setSearchConfig } from "./store/actions";
import "./App.scss";

function NoMatch() {
  return <h3>Page Does not Exist</h3>;
}

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

function Layout({ setBaseSearchConfig }) {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  useEffect(() => {
    (async () => {
      setLoadingConfig(true);

      const config = await getConfig();
      setBaseSearchConfig(config);
      setLoadingConfig(false);
    })();
  }, []);

  useEffect(() => {
    if (location.pathname === "/saved") {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  }, [location.pathname]);

  if (tabIndex === null || loadingConfig) return <>Loading</>;

  return (
    <div>
      <Tabs align="center" index={tabIndex} onChange={handleTabsChange}>
        <Box maxW="sm" mx="auto" mt={10}>
          <TabList>
            <Tab>
              <Link to="/search">Search</Link>
            </Tab>
            <Tab>
              <Link to="/saved">Saved</Link>
            </Tab>
          </TabList>
        </Box>
      </Tabs>
      <Outlet />
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setBaseSearchConfig: setSearchConfig,
};

const ConnectedLayout = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default App;
