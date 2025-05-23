import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import notesRoutes from "./routes/notes.js";
import authRoutes from "./routes/auth.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express();
dotenv.config();

// CORS configuration
const corsOptions = {
  origin: "*", // You can restrict this to specific origins if needed
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/notes", authMiddleware, notesRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
