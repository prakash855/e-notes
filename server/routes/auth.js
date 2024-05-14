// routes/auth.js

import express from "express";
import { signup, login, logout } from "../controllers/auth.js";

const router = express.Router();

const routes = [
  { path: "/signup", controller: signup },
  { path: "/login", controller: login },
  { path: "/logout", controller: logout },
];

routes.map(({ path, controller }) => router.post(path, controller));

export default router;
