import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/header/header";
import Body from "./sections/body";
import Sidebar from "./sections/sidebar";

const Home = () => (
  <Grid h="100vh" templateRows="10%" templateColumns="20% 20% 20% 20% 20%">
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
);

export default Home;
