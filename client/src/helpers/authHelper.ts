import { ToastId, UseToastOptions } from "@chakra-ui/react";
import {
  AsyncThunk,
  Dispatch,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { NavigateFunction } from "react-router-dom";

import { authStateType, ErrorPayload, NotesState } from "@/types";

export const handleAuth = async <T>(
  dispatch: ThunkDispatch<
    { notes: NotesState; auth: authStateType },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
  authAction: AsyncThunk<any, T, AsyncThunkConfig>,
  toast: (options?: UseToastOptions) => ToastId,
  navigate: NavigateFunction,
  credentials: T,
  dispatchWithLoading: (fn: () => Promise<void>) => Promise<void>
) => {
  await dispatchWithLoading(async () => {
    const resultAction = await dispatch(authAction(credentials));
    if (authAction.fulfilled.match(resultAction)) {
      const user = resultAction.payload;

      toast({
        title: "Success",
        description: user.message,
        status: "success",
        position: "top-right",
      });

      if (user.token) {
        localStorage.setItem("token", user.token);
        navigate("/");
        console.log("success", resultAction);
      } else {
        // Handle case where token is missing even though the action is fulfilled
        console.log("error: Token missing", resultAction);
        toast({
          title: "Error",
          description: "Token missing in response",
          status: "error",
          position: "top-right",
        });
      }
    } else {
      // Handle case where action is not fulfilled (e.g., rejected or pending)
      console.log("error: Action not fulfilled", resultAction);
      const errorPayload = resultAction?.payload as ErrorPayload;
      toast({
        title: "Error",
        description: errorPayload?.message || "Action not fulfilled",
        status: "error",
        position: "top-right",
      });
    }
  });
};
