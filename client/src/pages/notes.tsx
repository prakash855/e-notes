import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardVariant } from "@/components/card-variant";
import Loader from "@/components/loader";
import NoteCard from "@/components/note-card/note-card";
import { fetchNotes } from "@/services";
import { AppDispatch, RootState } from "@/store";
import { Note, NotePageType } from "@/types";

export const Notes = ({ isArchivedPage }: NotePageType) => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(({ notes }: RootState) => notes);

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
  }, [dispatch, isArchivedPage]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex gap-5 flex-wrap my-4">
        {notes?.notes
          ?.filter((note: Note) => note.isPinned)
          ?.map((pinnedNote: Note) => (
            <div key={pinnedNote._id}>
              <CardVariant variant="PINNED" />
              <NoteCard key={pinnedNote._id} {...pinnedNote} />
            </div>
          ))}
      </div>

      <CardVariant variant="OTHERS" />
      <div className="flex gap-5 flex-wrap my-4">
        {notes?.notes
          ?.filter(({ isArchived }: Note) =>
            isArchivedPage ? isArchived : !isArchived
          )
          ?.filter(({ isPinned }: Note) => !isPinned)
          ?.map((note: Note) => (
            <NoteCard key={note._id} {...note} />
          ))}
      </div>
    </>
  );
};

export default Notes;
