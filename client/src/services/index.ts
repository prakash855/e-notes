import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import { authAPI, notesAPI } from "../constants";
import { loginInitalValueType, Note, signupInitalValueType } from "../types";

// Notes Services
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios(notesAPI);
  return data;
});

export const fetchNotesById = createAsyncThunk(
  "notes/fetchNotesById",
  async (_id: string) => {
    const { data } = await axios(`${notesAPI}/${_id}`);
    return data;
  }
);

export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async (newNote: Note) => {
    const { data } = await axios.post(notesAPI, newNote);
    return data;
  }
);

export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (_id: string) => {
    await axios.delete(`${notesAPI}/${_id}`);
    return _id;
  }
);

export const updateNotes = createAsyncThunk(
  "notes/updatedNotes",
  async (updatedNote: Note) => {
    const { data } = await axios.patch(
      `${notesAPI}/${updatedNote._id}`,
      updatedNote
    );
    return data;
  }
);

export const archiveNoteById = createAsyncThunk(
  "notes/archiveNotes",
  async (_id: string) => {
    const { data } = await axios.patch(`${notesAPI}/${_id}/archive`);
    return data;
  }
);

export const pinNote = createAsyncThunk("notes/pinNote", async (id: string) => {
  const { data } = await axios.patch(`${notesAPI}/${id}/pin`);
  return data;
});

// Auth Services
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }: signupInitalValueType,
    { rejectWithValue }
  ) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response: AxiosResponse = await axios.post(`${authAPI}/signup`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      if (response.status !== 200) {
        throw new Error("Failed to signup");
      }

      return response.data;
    } catch (error) {
      if ((error as AxiosError).response) {
        return rejectWithValue((error as AxiosError).response!.data);
        // AxiosError with Response
      } else if ((error as AxiosError).request) {
        return rejectWithValue(`No response from server`);
        // AxiosError without Response
      } else {
        return rejectWithValue((error as AxiosError).message);
        // Regular error
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credential: loginInitalValueType, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(
        `${authAPI}/login`,
        credential
      );
      if (response.status !== 200) {
        throw new Error(`Failed to login`);
      }
      return response.data;
    } catch (error) {
      if ((error as AxiosError).response) {
        // AxiosError with response
        return rejectWithValue((error as AxiosError).response!.data);
      } else if ((error as AxiosError).request) {
        // AxiosError without response
        return rejectWithValue("No response from server");
      } else {
        // Regular error
        return rejectWithValue((error as Error).message);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // Assuming the API endpoint for logout is `${authAPI}/logout`
    const response: AxiosResponse = await axios.post(`${authAPI}/logout`);

    if (response.status !== 200) {
      throw new Error("Failed to logout");
    }

    // Clear local storage or perform any client-side logout actions
    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // AxiosError with response
      return rejectWithValue(error.response.data);
    } else if (axios.isAxiosError(error) && error.request) {
      // AxiosError without response
      return rejectWithValue("No response from server");
    } else {
      // Regular error
      return rejectWithValue((error as Error).message);
    }
  }
});
