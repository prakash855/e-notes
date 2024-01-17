import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Note {
  _id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  isArchived?: boolean;
  isPinned?: boolean;
  backgroundColor?: string;
}

export interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: NotesState = {
  notes: [],
  status: "idle",
  selectedNote: null,
  error: null,
};

const { VITE_APP_BASE_URL: API } = import.meta.env;

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios(API);
  return data;
});

export const fetchNotesById = createAsyncThunk(
  "notes/fetchNotesById",
  async (_id: string) => {
    const { data } = await axios(`${API}/${_id}`);
    return data;
  }
);

export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async (newNote: Note) => {
    const { data } = await axios.post(API, newNote);
    return data;
  }
);

export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (_id: string) => {
    await axios.delete(`${API}/${_id}`);
    return _id;
  }
);

export const updateNotes = createAsyncThunk(
  "notes/updatedNotes",
  async (updatedNote: Note) => {
    const { data } = await axios.patch(
      `${API}/${updatedNote._id}`,
      updatedNote
    );
    return data;
  }
);

export const archiveNoteById = createAsyncThunk(
  "notes/archiveNotes",
  async (_id: string) => {
    const { data } = await axios.patch(`${API}/${_id}/archive`);
    return data;
  }
);

export const pinNote = createAsyncThunk("notes/pinNote", async (id: string) => {
  const { data } = await axios.patch(`${API}/${id}/pin`);
  return data;
});
