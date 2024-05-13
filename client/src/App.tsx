import { Grid, GridItem } from "@chakra-ui/react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";
import Header from "./components/header/header";
import Login from "./pages/auth/login";
import SignupForm from "./pages/auth/signup";
import { Notes } from "./pages/notes";
import Sidebar from "./sections/sidebar";

const App = () => {
  // Hooks
  const { pathname } = useLocation();
  return (
    <>
      <Grid h="100vh" templateRows="10%" templateColumns="20% 20% 20% 20% 20%">
        {pathname !== "/signup" && pathname !== "/login" && (
          <GridItem rowSpan={2} colSpan={1} bg="ButtonShadow">
            <Sidebar />
          </GridItem>
        )}

        {pathname !== "/signup" && pathname !== "/login" && (
          <GridItem colSpan={4} className="mx-4">
            <Header />
          </GridItem>
        )}
        <GridItem colSpan={4} className="mx-4">
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/archive" element={<Notes isArchivedPage={true} />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
