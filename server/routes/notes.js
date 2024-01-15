import express from "express";
import { createNotes, deleteNotes, getNotes } from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNotes);
router.delete("/:id", deleteNotes);

export default router;
