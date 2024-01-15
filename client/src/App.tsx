import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import Header from "./components/header/header";
import Body from "./sections/body";

function App() {
  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="tomato" />
        <GridItem colSpan={4}>
          <Header />
        </GridItem>
        <GridItem colSpan={4}>
          <Body />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
