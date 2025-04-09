import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import notesReducer from "./slices/notesSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
