import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Header from '../components/Header';
import { UserContext } from '../context/userContext';
import routes from '../routes';

const SignupPage = () => {
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userCreateError, setUserCreateError] = useState(false);
  const inputFocus = useRef();

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.min3'))
      .max(20, t('errors.max')),
    password: Yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(6, t('errors.min6')),
    confirmPassword: Yup
      .string()
      .trim()
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
          const response = await axios.post(routes.signup(), values);
          logIn(response.data.token, response.data.username);
          navigate(routes.mainPage());
        } catch (e) {
          if (e.response.status === 409) {
            setUserCreateError(true);
          }
        }
      }}
    >
      {({
        errors, handleChange, handleSubmit, handleBlur, values, touched,
      }) => (
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
                  required
                  autoComplete="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={(touched.username && errors.username) || userCreateError}
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
                  required
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={(errors.password && touched.password) || userCreateError}
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
                  required
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={(touched.confirmPassword && errors.confirmPassword) || userCreateError}
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
