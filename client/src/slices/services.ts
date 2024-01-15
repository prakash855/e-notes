import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Note {
  _id?: string;
  title?: string;
  content?: string;
  isArchived?: boolean;
  backgroundColor?: string;
}

export interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};

const API = import.meta.env.VITE_APP_BASE_URL;

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios(API);
  return data;
});

export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async (newNote: Note) => {
    const { data } = await axios.post(API, newNote);
    return data;
  }
);
