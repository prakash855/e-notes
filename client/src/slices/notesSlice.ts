import { createSlice } from "@reduxjs/toolkit";

import { notesInitialState as initialState } from "../constants";
import {
  archiveNoteById,
  createNotes,
  deleteNotes,
  fetchNotes,
  fetchNotesById,
  pinNote,
  updateNotes,
} from "../services";

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.notes = payload;
      })
      .addCase(fetchNotes.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      })

      .addCase(fetchNotesById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotesById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.selectedNote = payload;
      })
      .addCase(fetchNotesById.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      })

      .addCase(createNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNotes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.notes.push(payload);
      })
      .addCase(createNotes.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      })

      .addCase(deleteNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNotes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note._id !== payload);
      })
      .addCase(deleteNotes.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      })

      .addCase(updateNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNotes.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.notes = state.notes.map((note) =>
          note._id === payload._id ? payload : note
        );
      })
      .addCase(updateNotes.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      })

      .addCase(archiveNoteById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(archiveNoteById.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note._id !== payload._id);
      })
      .addCase(archiveNoteById.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      })

      .addCase(pinNote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(pinNote.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const updatedNote = payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
      })
      .addCase(pinNote.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message ?? null;
      });
  },
});

export default notesSlice.reducer;
