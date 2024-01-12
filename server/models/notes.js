import { Schema, model } from "mongoose";

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
    },
  },
  { Timestamps: true }
);

export const Note = model("Note", notesSchema);
