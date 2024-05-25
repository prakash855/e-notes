import "./auth.css";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/components";
import { handleAuth } from "@/helpers/authHelper";
import { ErrorMessage, Field, Form, Formik } from "@/lib";

import { AuthButton } from "../../components/auth-button";
import { SubmitButton } from "../../components/submit-button";
import { useLoader } from "../../components/use-loader";
import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
  signupInitialValues as initialValues,
  signupValidationSchema as validationSchema,
} from "../../constants";
import { signup } from "../../services";
import { AppDispatch, RootState } from "../../store";
import { signupInitalValueType } from "../../types";
import { TextError } from "./text-error";

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, dispatchWithLoading } = useLoader();
  const auth = useSelector(({ auth }: RootState) => auth);

  console.log(auth);

  const onSubmit = useCallback(
    async (values: signupInitalValueType) =>
      await handleAuth(
        dispatch,
        signup,
        toast,
        navigate,
        values,
        dispatchWithLoading
      ),
    [toast, navigate, dispatch, dispatchWithLoading]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="form">
        <div className="form-control">
          <label htmlFor={firstName}>First Name</label>
          <Field type="text" id={firstName} name={firstName} />
          <ErrorMessage name={firstName} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={lastName}>Last Name</label>
          <Field type="text" id={lastName} name={lastName} />
          <ErrorMessage name={lastName} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={email}>Email</label>
          <Field type="email" id={email} name={email} />
          <ErrorMessage name={email} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={password}>Password</label>
          <Field type="password" id={password} name={password} />
          <ErrorMessage name={password} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={confirmPassword}>Confirm Password</label>
          <Field type="password" id={confirmPassword} name={confirmPassword} />
          <ErrorMessage name={confirmPassword} component={TextError} />
        </div>

        <SubmitButton
          isLoading={loading}
          loadingText="Signing up"
          authType="Signup"
        />
        <AuthButton lable="Already have an account?" path="/login" />
      </Form>
    </Formik>
  );
};

export default Signup;
