import mongoose from "mongoose";
import { Note } from "../models/notes.js";

export const getNotes = async (req, res) => {
  try {
    const Notes = await Note.find();
    res.status(200).json(Notes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getNotesById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No note with this ID`);

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotes = async (req, res) => {
  const note = req.body;
  const newNote = new Note(note);
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNotes = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with this ID`);
  await Note.findByIdAndDelete(id);
  res.json({ message: `Notes deleted successfully!` });
};

export const updateNotes = async (req, res) => {
  const { id: _id } = req.params;
  const notes = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with this ID`);
  const updatedNotes = await Note.findByIdAndUpdate(
    _id,
    { ...notes, _id },
    { new: true }
  );
  res.json(updatedNotes);
};

export const archiveNotes = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No note with this ID`);
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

export const pinNotes = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No note with this ID`);
  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).send(`No note with this ID`);

    // If the note is already pinned, return an error or handle it as needed
    if (note.isPinned) return res.status(404).send(`Note is already pinned`);

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
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
