import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SerializedError } from "@reduxjs/toolkit";

import { NotesState } from "@/types";

import {
  failed,
  loading,
  notesInitialState as initialState,
  succeeded,
} from "../constants";
import {
  archiveNoteById,
  createNotes,
  deleteNotes,
  fetchNotes,
  fetchNotesById,
  pinNote,
  updateNotes,
} from "../services";

const handlePending = (state: NotesState) => {
  state.status = loading;
};

const handleRejected = <T>(
  state: NotesState,
  action: PayloadAction<
    unknown,
    string,
    {
      arg: T;
      requestId: string;
      requestStatus: "rejected";
      aborted: boolean;
      condition: boolean;
    } & ({ rejectedWithValue: true } | { rejectedWithValue: false }),
    SerializedError
  >
) => {
  state.status = failed;
  state.error =
    (action.error?.message as string | undefined) ?? "An error occurred";
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, handlePending)
      .addCase(fetchNotes.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        state.notes = payload;
      })
      .addCase(fetchNotes.rejected, handleRejected)

      .addCase(fetchNotesById.pending, handlePending)
      .addCase(fetchNotesById.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        state.selectedNote = payload;
      })
      .addCase(fetchNotesById.rejected, handleRejected)

      .addCase(createNotes.pending, handlePending)
      .addCase(createNotes.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        state.notes.push(payload);
      })
      .addCase(createNotes.rejected, handleRejected)

      .addCase(deleteNotes.pending, handlePending)
      .addCase(deleteNotes.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        state.notes = state.notes.filter((note) => note._id !== payload);
      })
      .addCase(deleteNotes.rejected, handleRejected)

      .addCase(updateNotes.pending, handlePending)
      .addCase(updateNotes.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        state.notes = state.notes.map((note) =>
          note._id === payload._id ? payload : note
        );
      })
      .addCase(updateNotes.rejected, handleRejected)

      .addCase(archiveNoteById.pending, handlePending)
      .addCase(archiveNoteById.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        state.notes = state.notes.filter((note) => note._id !== payload._id);
      })
      .addCase(archiveNoteById.rejected, handleRejected)

      .addCase(pinNote.pending, handlePending)
      .addCase(pinNote.fulfilled, (state, { payload }) => {
        state.status = succeeded;
        const updatedNote = payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
      })
      .addCase(pinNote.rejected, handleRejected);
  },
});

export default notesSlice.reducer;
