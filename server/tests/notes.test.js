/**
 * @jest-environment node
 */
import request from "supertest";
import { app, mongooseConnection, server } from "../index.js"; // Adjust the import path as necessary
/* eslint-env jest */
/* global describe, it, expect, afterAll, beforeAll, beforeEach */

let token = "";
let noteId = "";

beforeAll(async () => {
  const loginRes = await request(app)
    .post("/auth/login")
    .send({ email: "prakash@gmail.com", password: "123456" });
  token = loginRes.body.token;
  if (!token) {
    throw new Error("Login failed: " + JSON.stringify(loginRes.body));
  }
}, 20000);

beforeEach(async () => {
  // Create a note before each test
  const createdNote = await request(app)
    .post("/notes")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: `Test Note ${Date.now()}`,
      content: "Initial note content",
    });

  noteId = createdNote.body._id;
});

describe("GET /notes", () => {
  it("should return 401 Unauthorized if no token is provided", async () => {
    const res = await request(app).get("/notes");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  // Test to fetch all the notes
  it("should return 200 and an array of notes if token is valid", async () => {
    const res = await request(app)
      .get("/notes")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  //Test to fetch notes by ID
  it("should return 200 and the note object for a valid note id", async () => {
    const res = await request(app)
      .get(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", noteId);
  });

  //Test to delete notes by ID
  it("should delete a note", async () => {
    const res = await request(app)
      .delete(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Notes deleted successfully!");

    // Try to fetch the deleted note
    const fetchRes = await request(app)
      .get(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(fetchRes.statusCode).toBe(404);
  }, 20000);

  // Test to create notes by ID
  it("should create a new note", async () => {
    const uniqueTitle = `Test Note ${Date.now()}`;
    const createdNote = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: uniqueTitle,
        content: "This is new note content",
      });
    const noteId = createdNote.body._id;
    expect(noteId).toBeDefined();
    expect(createdNote.body).toHaveProperty("title", uniqueTitle);
    expect(createdNote.body).toHaveProperty(
      "content",
      "This is new note content"
    );
  }, 20000);

  // Test to update notes by ID
  it("should update an existing note", async () => {
    const createdNote = await request(app)
      .post("/notes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: `Test Note ${Date.now()}`,
        content: "This is new note content",
      });

    const noteId = createdNote.body._id;
    const updatedContent = "Updated note content";
    const res = await request(app)
      .patch(`/notes/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: createdNote.body.title,
        content: updatedContent,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", noteId);
    expect(res.body).toHaveProperty("content", updatedContent);
  }, 20000);

  // Test to pin notes by ID
  it("should pin a note", async () => {
    const res = await request(app)
      .patch(`/notes/${noteId}/pin`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", noteId);
    expect(res.body).toHaveProperty("isPinned", true);
  }, 20000);

  // Test to archive notes by ID
  it("should archive a note", async () => {
    const res = await request(app)
      .patch(`/notes/${noteId}/archive`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", noteId);
    expect(res.body).toHaveProperty("isArchived", true);
  }, 20000);

  afterAll(async () => {
    if (server) {
      server.close();
    }
    await mongooseConnection.close();
  });
});
