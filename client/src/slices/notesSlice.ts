import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Note {
  _id: string;
  title: string;
  content: string;
  archived: boolean;
  backgroundColor: string;
}

interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios(import.meta.env.VITE_APP_BASE_URL);
  return response.data;
});

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default notesSlice.reducer;
