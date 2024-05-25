import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "@/types";

import { authState as initialState } from "../constants";
import { login, logout, signup } from "../services";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signup
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          {
            payload: { token },
            meta: {
              arg: { firstName, lastName, email },
            },
          }
        ) => {
          state.status = "succeeded";
          state.isLoggedIn = true;
          state.token = token;
          state.user = {
            firstName,
            lastName,
            email,
          };
          state.error = null;
        }
      )
      .addCase(signup.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload
          ? JSON.parse(JSON.stringify(payload))
          : "Signup failed";
      })

      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{ token: string; user: User; message: string }>
        ) => {
          state.status = "succeeded";
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.user = action.payload.user; // Correctly assigning the user object from the payload
          state.error = null;
        }
      )

      .addCase(login.rejected, (state, { error: { message } }) => {
        state.status = "failed";
        state.error = message || "login failed";
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload as string;
      });
  },
});

export default authSlice.reducer;
