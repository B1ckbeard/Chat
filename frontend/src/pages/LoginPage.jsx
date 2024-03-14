import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '..//context/context';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const LoginPage = () => {
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
          context.setContext({ ...context, token: null, username: null });
          window.localStorage.clear();
          navigate('/login');
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
    <div className='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
      <div className='container w-75 rounded shadow p-4' style={{ maxWidth: '300px' }}>
        <Form onSubmit={formik.handleSubmit}>
          <Form className="mb-3">
            <Form.Label className='fs-1 mb-3'>{t('login')}</Form.Label>
            <Form.Control name="username"
              autoComplete="username"
              placeholder={t('nickname')}
              id="username"
              required
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text" />
          </Form>
          <Form className="mb-3">
            <Form.Control
              name="password"
              autoComplete="current-password"
              placeholder={t('password')}
              id="password"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password" />
          </Form>
          <Button variant="outline-primary" className='w-100' type="submit">
            {t('login')}
          </Button>
        </Form>
        <div className="card-footer p-4">
          <div className="text-center">
            <a href="/signup">{t('signup')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
