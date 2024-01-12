import express from "express";
import { createNotes, getNotes } from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNotes);

export default router;
