import express from "express";
import {
  createNotes,
  deleteNotes,
  getNotes,
  updateNotes,
} from "../controllers/notes.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNotes);
router.delete("/:id", deleteNotes);
router.patch("/:id", updateNotes);

export default router;
