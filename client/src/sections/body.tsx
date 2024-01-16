import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NoteCard from "../components/note-card/note-card";
import { fetchNotes, Note } from "../slices/services";
import { AppDispatch, RootState } from "../store";

export const Body = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { notes } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch, pathname]);

  return (
    <>
      <div className="flex gap-5 flex-wrap my-4">
        {notes?.notes
          ?.filter((note: Note) => note.isPinned)
          ?.map((note: Note) => (
            <NoteCard key={note._id} {...note} />
          ))}
      </div>
      <hr />
      <div className="flex gap-5 flex-wrap my-4">
        {notes?.notes
          ?.filter((note: Note) =>
            pathname === `/` ? !note.isArchived : note.isArchived
          )
          ?.filter((note: Note) => !note.isPinned)
          ?.map((note: Note) => (
            <NoteCard key={note._id} {...note} />
          ))}
      </div>
    </>
  );
};

export default Body;
