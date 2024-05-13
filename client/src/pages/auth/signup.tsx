import { Formik, ErrorMessage, Field, Form, Yup, Button } from "../../lib";

import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
  signupInitialValues as initialValues,
} from "../../constants";
import { TextError } from "./text-error";

import "./auth.css";
import { signupInitalValueType } from "../../types";
import { Link } from "react-router-dom";
import { AuthButton } from "../../components/auth-button";

const Signup = () => {
  const onSubmit = (values: signupInitalValueType) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email(`Invalid email format`).required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string().required(),
  });

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
          <Field type="text" id={email} name={email} />
          <ErrorMessage name={email} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={password}>Password</label>
          <Field type="text" id={password} name={password} />
          <ErrorMessage name={password} component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor={confirmPassword}>Confirm Password</label>
          <Field type="text" id={confirmPassword} name={confirmPassword} />
          <ErrorMessage name={confirmPassword} component={TextError} />
        </div>

        <Button type="submit" colorScheme="teal" size="md">
          Signup
        </Button>
        <AuthButton lable="Already have an account?" path="/login" />
      </Form>
    </Formik>
  );
};

export default Signup;
