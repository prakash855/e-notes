import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/header/header";
import Body from "./sections/body";
import Sidebar from "./sections/sidebar";

function App() {
  return (
    <>
      <Grid
        h="100vh"
        templateRows="10%"
        templateColumns="20% 20% 20% 20% 20%" // Each column takes 20% of the total width
      >
        <GridItem rowSpan={2} colSpan={1} bg="ButtonShadow">
          <Sidebar />
        </GridItem>
        <GridItem colSpan={4} className="mx-4">
          <Header />
        </GridItem>
        <GridItem colSpan={4} className="mx-4">
          <Body />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
