// routes/auth.js

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.post(
  "/signup",
  async (
    { body: { firstName, lastName, email, password, confirmPassword } },
    res
  ) => {
    try {
      // Check if the user with the given email already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      // Check if the password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user record
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Create and sign a JWT token for the newly created user
      const token = jwt.sign(
        { sub: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ token });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post("/login", async ({ body: { email, password } }, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If the credentials are valid, create and sign a JWT token
    const token = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (_, res) => {
  // You may want to perform additional cleanup or actions upon logout
  // For example, destroying the session, clearing user-related data, etc.

  res.status(200).json({ message: "Logout successful" });
});

export default router;
