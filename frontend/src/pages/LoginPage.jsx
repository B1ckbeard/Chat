import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '..//context/context';
import { useNavigate } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Header from '../components/Header/Header';

const LoginPage = () => {
  const inputFocus = useRef(null);
  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required')),
    password: Yup.string().required(t('required')),
  });

  const context = useContext(UserContext);
  const navigate = useNavigate();
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
          return;
        }
        toast.error(t('toast.networkError'));
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
          <Form.Group className="mb-3">
            <FloatingLabel label={t('username')} >
              <Form.Control
                ref={inputFocus}
                type="text"
                placeholder={t('username')}
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3">
            <FloatingLabel label={t('password')} >
              <Form.Control
                type="password"
                placeholder={t('password')}
                name="password"
                autoComplete="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </FloatingLabel>
          </Form.Group>
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
