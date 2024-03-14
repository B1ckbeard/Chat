import React, { useContext } from "react";
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../context/context';
import Header from '../components/Header/Header';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const SignupPage = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                    toast.error(t('toast.networkError'));
                }
            }}
        >
            {({ errors }) => (
                <div className="d-flex flex-column h-100">
                    <Header />
                    <div className="container-fluid h-100">
                        <div className="row justify-content-center align-content-center h-100">
                            <div className="col-12 col-md-8 col-xxl-6">
                                <div className="card shadow-sm">
                                    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                                        <Form className="w-75 text-center">
                                            <h1 className="text-center mb-4">{t('registration')}</h1>
                                            <div className="form-floating mb-3">
                                                <Field placeholder={t('username')} name="username" autoComplete="username" id="username" className={('form-control')} />
                                                <label className="form-label visually-hidden" htmlFor="username">{t('username')}</label>
                                                <ErrorMessage name="username" />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <Field placeholder={t('password')} name="password" aria-describedby="passwordHelpBlock" autoComplete="new-password" type="password" id="password" className={('form-control')} />
                                                <label className="form-label visually-hidden" htmlFor="password">{t('password')}</label>
                                                <ErrorMessage name="password" />
                                                
                                            </div>
                                            <div className="form-floating mb-4">
                                                <Field placeholder={t('confirmPassword')} name="confirmPassword" autoComplete="new-password" type="password" id="confirmPassword" className={('form-control')} />
                                                <label className="form-label visually-hidden" htmlFor="confirmPassword">{t('confirmPassword')}</label>
                                                <ErrorMessage name="confirmPassword" />
                                            </div>
                                            <Button variant="outline-primary" type="submit" className="w-75">{t('signup')}</Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default SignupPage;
