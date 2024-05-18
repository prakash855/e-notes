import { Box, Button, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthButton } from "../../components/auth-button";
import { SubmitButton } from "../../components/submit-button";
import { useLoader } from "../../components/use-loader";
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
      await dispatchWithLoading(async () => {
        const resultAction = await dispatch(login(values));
        if (login.fulfilled.match(resultAction)) {
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
            console.log("error", resultAction);
            toast({
              title: "Error",
              description: resultAction.payload.message,
              status: "error",
              position: "top-right",
            });
          }
        }
      });
    },
    [dispatch, dispatchWithLoading, toast, navigate]
  );

  const guestLoginHandler = async () => {
    await dispatchWithLoading(async () => {
      const resultAction = await dispatch(login(guestUserCredential));
      if (login.fulfilled.match(resultAction)) {
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
          console.log("error", resultAction);
          toast({
            title: "Error",
            description: resultAction.payload.message,
            status: "error",
            position: "top-right",
          });
        }
      }
    });
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
