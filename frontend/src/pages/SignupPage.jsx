import React, { useContext, useState, useRef, useEffect } from "react";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import Header from '../components/Header/Header';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/context';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userCreateError, setUserCreateError] = useState(false);
  const inputFocus = useRef();

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('errors.required'))
      .trim()
      .min(3, t('errors.min3'))
      .max(20, t('errors.max')),
    password: Yup.string()
      .required(t('errors.required'))
      .trim()
      .min(6, t('errors.min6')),
    confirmPassword: Yup.string()
      .required(t('errors.required'))
      .oneOf([Yup.ref('password'), null], t('errors.match')),

  });
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const response = await axios.post('/api/v1/signup', values)
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem('username', response.data.username);
          context.setContext({ token: response.data.token, username: response.data.username });
          navigate('/');
        } catch (e) {
          if (e.response.status === 409) {
            setUserCreateError(true);
          }
        }
      }}
    >
      {({ errors, handleChange, handleSubmit, values }) => (
        <div className="d-flex flex-column vh-100 bg-light">
          <Header />
          <div className="container w-50 m-auto shadow p-4 bg-white rounded">
            <Form className="w-auto" onSubmit={handleSubmit}>
              <h1 className="text-center mb-3">{t('registration')}</h1>
              <Form.Floating className="mb-3">
                <Form.Control
                  ref={inputFocus}
                  type="text"
                  placeholder={t('username')}
                  name="username"
                  id="username"
                  autoComplete="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={errors.username || userCreateError}
                />
                <label htmlFor="username">{t('username')}</label>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="password"
                  placeholder={t('password')}
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={errors.password || userCreateError}
                />
                <label htmlFor="password">{t('password')}</label>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control
                  type="password"
                  placeholder={t('confirmPassword')}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={errors.confirmPassword || userCreateError}
                />
                <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                  {userCreateError ? t('errors.exists') : null}
                </Form.Control.Feedback>
              </Form.Floating>
              <Button variant="outline-primary" type="submit" className="w-100">{t('signup')}</Button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignupPage;
