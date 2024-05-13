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
