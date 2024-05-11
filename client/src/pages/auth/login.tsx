import {
  email,
  loginInitialValues as initialValues,
  password,
} from "../../constants";
import { Formik, ErrorMessage, Field, Form, Yup, Button } from "../../lib";
import { loginInitalValueType } from "../../types";
import { TextError } from "./text-error";

const onSubmit = (values: loginInitalValueType) => console.log(values);

const validationSchema = Yup.object({
  email: Yup.string().email(`Invalid email format`).required(),
  password: Yup.string().required(),
});

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
      </Form>
    </Formik>
  );
};

export default Login;
