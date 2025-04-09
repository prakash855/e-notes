import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import axiosInstance from "@/axiosIntance";
import { getToken } from "@/helpers/token";

import { authAPI, notesAPI } from "../constants";
import { loginInitalValueType, Note, signupInitalValueType } from "../types";

// Notes Services
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue(`No token found!`);
    }
    try {
      const { data } = await axiosInstance(notesAPI);
      return data;
    } catch (error: any) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else
        return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchNotesById = createAsyncThunk(
  "notes/fetchNotesById",
  async (_id: string) => {
    const { data } = await axiosInstance(`${notesAPI}/${_id}`);
    return data;
  }
);

export const createNotes = createAsyncThunk(
  "notes/createNotes",
  async (newNote: Note, { rejectWithValue }) => {
    const token = getToken();
    if (!token) {
      return rejectWithValue(`No token found!`);
    }
    try {
      const { data } = await axiosInstance.post(notesAPI, newNote, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (_id: string) => {
    await axiosInstance.delete(`${notesAPI}/${_id}`);
    return _id;
  }
);

export const updateNotes = createAsyncThunk(
  "notes/updatedNotes",
  async (updatedNote: Note) => {
    const { data } = await axiosInstance.patch(
      `${notesAPI}/${updatedNote._id}`,
      updatedNote
    );
    return data;
  }
);

export const archiveNoteById = createAsyncThunk(
  "notes/archiveNotes",
  async (_id: string) => {
    const { data } = await axiosInstance.patch(`${notesAPI}/${_id}/archive`);
    return data;
  }
);

export const pinNote = createAsyncThunk("notes/pinNote", async (id: string) => {
  const { data } = await axiosInstance.patch(`${notesAPI}/${id}/pin`);
  return data;
});

// Auth Services
export const signup = createAsyncThunk(
  "auth/signup",
  async (signupData: signupInitalValueType, { rejectWithValue }) => {
    try {
      if (signupData.password !== signupData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data, status }: AxiosResponse = await axiosInstance.post(
        `${authAPI}/signup`,
        signupData
      );

      if (status !== 201) {
        throw new Error("Failed to signup");
      }

      return data;
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
      const { data, status }: AxiosResponse = await axiosInstance.post(
        `auth/login`,
        credential
      );
      if (status !== 200) {
        throw new Error(`Failed to login`);
      }
      return data;
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
    const { data, status }: AxiosResponse = await axiosInstance.post(
      `${authAPI}/logout`
    );

    if (status !== 200) {
      throw new Error("Failed to logout");
    }

    // Clear local storage or perform any client-side logout actions
    localStorage.removeItem("token");

    return data;
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
