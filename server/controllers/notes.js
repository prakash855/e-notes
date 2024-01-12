import { Note } from "../models/notes.js";

export const getNotes = async (req, res) => {
  try {
  } catch (error) {
    const Notes = await Note.find();
    res.status(200).json(Notes);
    res.status(404).json({ message: error.message });
  }
};

export const createNotes = async (req, res) => {
  try {
  } catch (error) {
    const Notes = await Note.find();
    res.status(200).json(Notes);
    res.status(404).json({ message: error.message });
  }
};
