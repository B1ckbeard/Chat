import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useUser } from '../context/context';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { setContext, isAuthenticated, setIsAuthenticated } = useUser();
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      window.localStorage.setItem('token', response.data.token);
      setContext({ token: response.data.token, username: response.data.username });
      console.log('localStorage.token', localStorage.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  /*
  console.log('autorized', isAuthenticated);
  if (isAuthenticated) {
    navigate('/');
  }
  */

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="username" placeholder="Username" />
          {errors.username && touched.username ? (
            <div>{errors.username}</div>
          ) : null}

          <Field name="password" placeholder="Password" type="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginPage;
