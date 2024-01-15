import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../components/note-card/note-card";
import { fetchNotes, Note } from "../slices/services";
import { AppDispatch, RootState } from "../store";

export const Body = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notes } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <div className="flex gap-5 flex-wrap my-4">
      {notes?.notes?.map((note: Note) => (
        <NoteCard key={note._id} {...note} />
      ))}
    </div>
  );
};

export default Body;
