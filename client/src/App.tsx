import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/header/header";
import NoteCard from "./components/note-card";
import { fetchNotes, Note } from "./slices/services";
import { AppDispatch, RootState } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { notes } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

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
          <div className="flex gap-5 flex-wrap justify-center my-4">
            {notes?.notes?.map((note: Note) => (
              <NoteCard key={note._id} {...note} />
            ))}
          </div>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
