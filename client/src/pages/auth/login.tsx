import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components";
import { handleAuth } from "@/helpers/authHelper";
import { Box, Button } from "@/lib";

import { AuthButton } from "../../components/auth-button";
import { SubmitButton } from "../../components/submit-button";
import { useLoader } from "../../hooks/use-loader";
import {
  email,
  guestUserCredential,
  loginInitialValues as initialValues,
  loginValidationSchema as validationSchema,
  password,
} from "../../constants";
import { ErrorMessage, Field, Form, Formik } from "../../lib";
import { login } from "../../services";
import { AppDispatch } from "../../store";
import { loginInitalValueType } from "../../types";
import { TextError } from "./text-error";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, dispatchWithLoading } = useLoader();
  const toast = useToast();

  const onSubmit = useCallback(
    async (values: loginInitalValueType) => {
      await handleAuth(
        dispatch,
        login,
        toast,
        navigate,
        values,
        dispatchWithLoading
      );
    },
    [dispatch, dispatchWithLoading, toast, navigate]
  );

  const guestLoginHandler = async () => {
    await handleAuth(
      dispatch,
      login,
      toast,
      navigate,
      guestUserCredential,
      dispatchWithLoading
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="form">
        <div className="form-control">
          <label htmlFor={email}>Email</label>
          <Field type="text" id={email} name={email} />
          <ErrorMessage name={email} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={password}>Password</label>
          <Field type="text" id={password} name={password} />
          <ErrorMessage name={password} component={TextError} />
        </div>
        <SubmitButton
          isLoading={loading}
          loadingText="Logging in"
          authType="Login"
        />
        <Box className="py-2">
          <Button onClick={guestLoginHandler} className="flex justify-end">
            Login as Guest User?
          </Button>
        </Box>

        <AuthButton lable="Don't have an account?" path="/signup" />
      </Form>
    </Formik>
  );
};

export default Login;
