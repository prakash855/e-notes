import mongoose from "mongoose";

export const unknowNoteHandler = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No note with this ID`);
};
