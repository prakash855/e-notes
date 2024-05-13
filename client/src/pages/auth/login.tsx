import { AuthButton } from "../../components/auth-button";
import {
  email,
  loginInitialValues as initialValues,
  loginValidationSchema as validationSchema,
  password,
} from "../../constants";
import { Formik, ErrorMessage, Field, Form, Button } from "../../lib";
import { loginInitalValueType } from "../../types";
import { TextError } from "./text-error";

const onSubmit = (values: loginInitalValueType) => console.log(values);

const Login = () => {
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

        <Button type="submit" colorScheme="teal" size="md">
          Login
        </Button>
        <AuthButton lable="Don't have an account?" path="/signup" />
      </Form>
    </Formik>
  );
};

export default Login;
