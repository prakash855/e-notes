import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/notesSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
