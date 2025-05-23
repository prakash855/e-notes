import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";

import { Grid, GridItem } from "@/lib";

import Header from "./components/header/header";
import { PrivateRoute } from "./components/private-route";
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
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Notes />
                </PrivateRoute>
              }
            />
            <Route
              path="/archive"
              element={
                <PrivateRoute>
                  <Notes isArchivedPage={true} />
                </PrivateRoute>
              }
            />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </GridItem>
      </Grid>
    </>
  );
};

export default App;
