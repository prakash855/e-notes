import mongoose from "mongoose";

export const unknowNoteHandler = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No note with this ID`);
};
