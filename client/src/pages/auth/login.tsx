import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthButton } from "../../components/auth-button";
import {
  email,
  loginInitialValues as initialValues,
  loginValidationSchema as validationSchema,
  password,
} from "../../constants";
import { Formik, ErrorMessage, Field, Form } from "../../lib";
import { login } from "../../services";
import { useLoader } from "../../components/use-loader";
import { AppDispatch, RootState } from "../../store";
import { loginInitalValueType } from "../../types";
import { TextError } from "./text-error";
import { SubmitButton } from "../../components/submit-button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, dispatchWithLoading } = useLoader();
  const { isLoggedIn, status, user } = useSelector(
    ({ auth }: RootState) => auth
  );
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
    [dispatch, dispatchWithLoading, isLoggedIn, status, user]
  );

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
        <AuthButton lable="Don't have an account?" path="/signup" />
      </Form>
    </Formik>
  );
};

export default Login;
