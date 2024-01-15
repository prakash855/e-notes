import { createSlice } from "@reduxjs/toolkit";
import {
  archiveNoteById,
  createNotes,
  deleteNotes,
  fetchNotes,
  fetchNotesById,
  initialState,
  updateNotes,
} from "./services";

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
      })

      .addCase(fetchNotesById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotesById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedNote = action.payload;
      })
      .addCase(fetchNotesById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(createNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes.push(action.payload);
      })
      .addCase(createNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(deleteNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      })
      .addCase(deleteNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(updateNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        );
      })
      .addCase(updateNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      })

      .addCase(archiveNoteById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(archiveNoteById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload._id
        );
      })
      .addCase(archiveNoteById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default notesSlice.reducer;
