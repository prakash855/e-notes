import { Note } from "../models/notes.js";

export const getNotes = async (req, res) => {
  try {
    const Notes = await Note.find();
    res.status(200).json(Notes);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
