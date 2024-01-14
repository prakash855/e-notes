import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "./App.css";
import NoteCard from "./components/note-card";

function App() {
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="tomato" />
        <GridItem colSpan={4} bg="papayawhip" />
        <GridItem colSpan={4}>
          <div className="flex gap-5 flex-wrap justify-center my-4">
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
