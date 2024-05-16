import { Yup } from "../src/lib";
import {
  authStateType,
  loginInitalValueType,
  NotesState,
  signupInitalValueType,
} from "./types";

const { VITE_APP_BASE_URL: API } = import.meta.env;

export const notesAPI = `${API}/notes`;
export const authAPI = `${API}/auth`;

export const colorOptions = [
  { value: "gray.500", label: "Gray" },
  { value: "red.500", label: "Red" },
  { value: "orange.500", label: "Orange" },
  { value: "yellow.500", label: "Yellow" },
  { value: "green.500", label: "Green" },
  { value: "teal.500", label: "Teal" },
  { value: "blue.500", label: "Blue" },
  { value: "cyan.500", label: "Cyan" },
  { value: "purple.500", label: "Purple" },
  { value: "pink.500", label: "Pink" },
  { value: "indigo.500", label: "Indigo" },
  { value: "brown.500", label: "Brown" },
  { value: "amber.500", label: "Amber" },
  { value: "lime.500", label: "Lime" },
  { value: "emerald.500", label: "Emerald" },
  { value: "teal.300", label: "Light Teal" },
  { value: "blue.300", label: "Light Blue" },
  { value: "purple.300", label: "Light Purple" },
  { value: "pink.300", label: "Light Pink" },
  { value: "cyan.300", label: "Light Cyan" },
  { value: "orange.300", label: "Light Orange" },
  { value: "yellow.300", label: "Light Yellow" },
  { value: "green.300", label: "Light Green" },
  { value: "teal.700", label: "Dark Teal" },
  { value: "blue.700", label: "Dark Blue" },
  { value: "purple.700", label: "Dark Purple" },
  { value: "pink.700", label: "Dark Pink" },
  { value: "cyan.700", label: "Dark Cyan" },
  { value: "orange.700", label: "Dark Orange" },
  { value: "yellow.700", label: "Dark Yellow" },
  { value: "green.700", label: "Dark Green" },
  { value: "gray.300", label: "Light Gray" },
  { value: "red.300", label: "Light Red" },
  { value: "orange.300", label: "Light Orange" },
  { value: "yellow.300", label: "Light Yellow" },
  { value: "green.300", label: "Light Green" },
  { value: "teal.100", label: "Very Light Teal" },
  { value: "blue.100", label: "Very Light Blue" },
  { value: "purple.100", label: "Very Light Purple" },
  { value: "pink.100", label: "Very Light Pink" },
  { value: "cyan.100", label: "Very Light Cyan" },
  { value: "orange.100", label: "Very Light Orange" },
  { value: "yellow.100", label: "Very Light Yellow" },
  { value: "green.100", label: "Very Light Green" },
];

export const notesPicture = `https://timingapp.com/cdn-cgi/image/format=auto,width=256/img/app-icons/com.apple.Notes/icon_128x128_2x.png`;

export const firstName = "firstName";
export const lastName = "lastName";
export const email = "email";
export const password = "password";
export const confirmPassword = "confirmPassword";

//Auth
export const signupInitialValues: signupInitalValueType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const loginInitialValues: loginInitalValueType = {
  email: "",
  password: "",
};

export const signupValidationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email(`Invalid email format`).required(),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .min(6, "Password must be at least 6 characters long")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string().email(`Invalid email format`).required(),
  password: Yup.string().required(),
});

export const authState: authStateType = {
  user: null,
  isLoggedIn: false,
  status: "idle",
  error: null,
};

// Notes

export const notesInitialState: NotesState = {
  notes: [],
  status: "idle",
  selectedNote: null,
  error: null,
};
