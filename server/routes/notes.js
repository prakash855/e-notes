import express from "express";

const router = express.Router();

router.get("/", getNotes);

export default router;
