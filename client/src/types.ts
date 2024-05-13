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

//Auth
export type AuthButtonType = {
  lable: string;
  path: string;
};
