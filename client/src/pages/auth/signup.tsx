import { Formik, ErrorMessage, Field, Form, Button } from "../../lib";

import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
  signupInitialValues as initialValues,
  signupValidationSchema as validationSchema,
} from "../../constants";
import { TextError } from "./text-error";

import "./auth.css";
import { signupInitalValueType } from "../../types";
import { AuthButton } from "../../components/auth-button";
import { signup } from "../../services";

const Signup = () => {
  const onSubmit = (values: signupInitalValueType) => {
    signup(values);
  };

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

        <Button type="submit" colorScheme="teal" size="md">
          Signup
        </Button>
        <AuthButton lable="Already have an account?" path="/login" />
      </Form>
    </Formik>
  );
};

export default Signup;
