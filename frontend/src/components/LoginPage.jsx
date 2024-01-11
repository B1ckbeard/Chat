import React from 'react';
import { useFormik, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';

const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form>
          <Field name="firstName" />
          <Field name="lastName" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  )
};

export default LoginPage;