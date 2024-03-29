import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsPinFill } from "react-icons/bs";

import NoteCard from "../components/note-card/note-card";
import { fetchNotes, Note } from "../slices/services";
import { AppDispatch, RootState } from "../store";
import { CardVariant } from "../components/card-variant";
import Loader from "../components/loader";
import styles from "../components/note-card/note-card.module.scss";

export const Body = () => {
  // Hooks
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes);

  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchNotes());
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, pathname]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex gap-5 flex-wrap my-4">
        {notes?.notes
          ?.filter((note: Note) => note.isPinned)
          ?.map((pinnedNote: Note) => (
            <div key={pinnedNote._id}>
              <div className="flex items-end">
                <BsPinFill
                  style={{ fontSize: 13 }}
                  className={`${styles["icon-style"]} relative left-4`}
                />
                <CardVariant variant="PINNED" />
              </div>
              <NoteCard key={pinnedNote._id} {...pinnedNote} />
            </div>
          ))}
      </div>

      <CardVariant variant="OTHERS" />
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
