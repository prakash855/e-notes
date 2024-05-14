import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { loginInitalValueType, Note, signupInitalValueType } from "../types";

const { VITE_APP_BASE_URL: API } = import.meta.env;

// Notes Services
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const { data } = await axios(API);
  return data;
});

export const fetchNotesById = createAsyncThunk(
  "notes/fetchNotesById",
  async (_id: string) => {
    const { data } = await axios(`${API}/${_id}`);
    return data;
  }
);

export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async (newNote: Note) => {
    const { data } = await axios.post(API, newNote);
    return data;
  }
);

export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (_id: string) => {
    await axios.delete(`${API}/${_id}`);
    return _id;
  }
);

export const updateNotes = createAsyncThunk(
  "notes/updatedNotes",
  async (updatedNote: Note) => {
    const { data } = await axios.patch(
      `${API}/${updatedNote._id}`,
      updatedNote
    );
    return data;
  }
);

export const archiveNoteById = createAsyncThunk(
  "notes/archiveNotes",
  async (_id: string) => {
    const { data } = await axios.patch(`${API}/${_id}/archive`);
    return data;
  }
);

export const pinNote = createAsyncThunk("notes/pinNote", async (id: string) => {
  const { data } = await axios.patch(`${API}/${id}/pin`);
  return data;
});

// Auth Services
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { firstName, lastName, email, password }: signupInitalValueType,
    { rejectWithValue }
  ) => {
    try {
      const response: AxiosResponse = await axios.post(`${API}/signup`, {
        firstName,
        lastName,
        email,
        password,
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
  async ({ email, password }: loginInitalValueType, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.post(`${API}/login`, {
        email,
        password,
      });
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
