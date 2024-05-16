import { Note } from "../models/notes.js";
import { unknowNoteHandler } from "../utils.js";

export const getNotes = async (_, res) => {
  try {
    const Notes = await Note.find();
    res.status(200).json(Notes);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

export const getNotesById = async ({ params: { id } }, res) => {
  unknowNoteHandler(id, res);
  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
};

export const createNotes = async ({ body }, res) => {
  const note = body;
  const newNote = new Note(note);
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNotes = async ({ params: { id } }, res) => {
  unknowNoteHandler(id, res);
  await Note.findByIdAndDelete(id);
  res.json({ message: `Notes deleted successfully!` });
};

export const updateNotes = async ({ params, body }, res) => {
  const { id: _id } = params;
  const notes = body;
  unknowNoteHandler(_id, res);
  const updatedNotes = await Note.findByIdAndUpdate(
    _id,
    { ...notes, _id },
    { new: true }
  );
  res.json(updatedNotes);
};

export const archiveNotes = async ({ params }, res) => {
  const { id: _id } = params;
  unknowNoteHandler(_id, res);
  try {
    const note = await Note.findById(_id);
    if (!note) {
      return res.status(404).send(`No note with this ID`);
    }
    const updatedNote = await Note.findByIdAndUpdate(
      _id,
      { isArchived: !note.isArchived },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).send(`Failed to update note`);
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const pinNotes = async ({ params: { id } }, res) => {
  unknowNoteHandler(id, res);
  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).send(`No note with this ID`);

    // If the note is already pinned, unpin it
    if (note.isPinned) {
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { isPinned: false },
        { new: true }
      );
      if (!updatedNote) return res.status(404).send(`Failed to update note`);
      res.json(updatedNote);
    } else {
      // Unpin any currently pinned notes
      await Note.updateMany({ isPinned: true }, { isPinned: false });

      // Pin the selected note
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { isPinned: true },
        { new: true }
      );
      if (!updatedNote) return res.status(404).send(`Failed to update note`);
      res.json(updatedNote);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
