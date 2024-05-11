import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
} from "../../constants";
import { TextError } from "./text-error";

import "./auth.css";

import { initalValueType } from "../../types";
import { Button } from "@chakra-ui/react";

const Signup = () => {
  const initialValues: initalValueType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values: initalValueType) => {
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
      </Form>
    </Formik>
  );
};

export default Signup;
