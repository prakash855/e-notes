import { useSelector } from "react-redux";
import "./App.css";
import NoteCard from "./components/note-card";

function App() {
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <div className="flex gap-5 flex-wrap">
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </div>
  );
}

export default App;
