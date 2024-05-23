import { ReactNode } from "react";
import { IconType } from "react-icons";

// Notes
export interface Note {
  _id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  isArchived?: boolean;
  isPinned?: boolean;
  backgroundColor?: string;
}

export interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export type signupInitalValueType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type loginInitalValueType = {
  email: string;
  password: string;
};

export type NotePageType = {
  isArchivedPage?: boolean;
};

export type CardVariantProps = {
  variant: string;
};

export type ReactChildrenType = {
  children: ReactNode;
};

//Auth

export interface SidebarConfigItem {
  icon: IconType;
  label: string;
  path?: string;
}

export type AuthButtonType = {
  lable: string;
  path: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export type authStateType = {
  user: User | null; // user is either of type User or null
  token: string | null; // token is either string or null
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed" | null; // status includes null
  error: string | null; // error is either string or null
};

export type SubmitButtonType = {
  isLoading: boolean;
  loadingText: string;
  authType: string;
};

export type PrivateRouteProps = {
  children: ReactNode;
};

export type LogoutType = {
  onClose: () => void;
};
