import express from "express";
import {
  getNotes,
  pinNotes,
  deleteNotes,
  createNotes,
  updateNotes,
  archiveNotes,
  getNotesById,
} from "../controllers/notes.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

const routes = [
  { method: "get", path: "/", controller: getNotes },
  { method: "post", path: "/", controller: createNotes },
  { method: "get", path: "/:id", controller: getNotesById },
  { method: "patch", path: "/:id", controller: updateNotes },
  { method: "delete", path: "/:id", controller: deleteNotes },
  { method: "patch", path: "/:id/pin", controller: pinNotes },
  { method: "patch", path: "/:id/archive", controller: archiveNotes },
];

routes.map(({ method, path, controller }) =>
  router[method](path, authMiddleware, controller)
);

export default router;
