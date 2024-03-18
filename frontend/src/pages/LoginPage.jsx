import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '..//context/context';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header/Header';

const LoginPage = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userAuthError, setUserAuthError] = useState(false);
  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required')),
    password: Yup.string().required(t('required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/login', values);
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('username', response.data.username);
        context.setContext({ token: response.data.token, username: response.data.username });
      } catch (e) {
        if (e.response.status === 401) {
          setUserAuthError(true);
        }
      }
    }
  });
  useEffect(() => {
    if (context.token) {
      navigate('/');
    }
  }, [context.token, navigate])

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Header />
      <div className='container w-50 m-auto shadow p-4 bg-white rounded'>
        <Form className="w-auto" onSubmit={formik.handleSubmit}>
          <h1 className="text-center mb-3">{t('login')}</h1>
          <Form.Floating className="mb-3">
            <Form.Control
              ref={inputFocus}
              type="text"
              placeholder={t('nickname')}
              name="username"
              id="username"
              autoComplete="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              isInvalid={userAuthError}
            />
            <label htmlFor="username">{t('nickname')}</label>
          </Form.Floating>
          <Form.Floating className="mb-3">
            <Form.Control
              type="password"
              placeholder={t('password')}
              name="password"
              id="password"
              autoComplete="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={userAuthError}
            />
            <label htmlFor="password">{t('password')}</label>
            <Form.Control.Feedback type="invalid">
                  {userAuthError ? t('errors.auth') : null}
                </Form.Control.Feedback>
          </Form.Floating>
          <Button variant="outline-primary" className='w-100 mb-3' type="submit">
            {t('login')}
          </Button>
        </Form>
        <div className="card-footer">
          <div className="text-center">
            <a href="/signup">{t('registration')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
