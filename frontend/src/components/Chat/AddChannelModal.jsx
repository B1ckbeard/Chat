import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../context/context';
import ioClient from '../../servicesSocket/socket';
import { selectors as channelSelectors } from './../../store/channelsSlice'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const AddChannelModal = ({ show, onHide }) => {
    const context = useContext(UserContext);
    const channels = useSelector(channelSelectors.selectAll);
    const [inputRef, setInputRef] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        if (inputRef) {
            inputRef.focus();
        }
    }, [inputRef]);

    const validationSchema = Yup.object().shape({
        channel: Yup
            .string()
            .required(t('errors.required'))
            .min(3, t('errors.min3'))
            .max(20, t('errors.max'))
            .notOneOf(channels.map((currentChannel) => (currentChannel.name)), t('errors.uniq'))
    });

    return (
        <Modal show={show} onHide={onHide}>
            <Formik
                initialValues={{
                    channel: "",
                    username: context.username,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    try {
                        const newChannel = { name: values.channel, username: values.username }
                        ioClient.emit("newChannel", newChannel);
                        toast.success(t('toast.channelCreated'));
                        resetForm();
                        onHide();
                    } catch (e) {
                        console.error(e);
                    }
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <Modal.Header closeButton onHide={onHide}>
                            <Modal.Title>{t('addChannel')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Field
                                    name="channel"
                                    aria-label="Имя канала"
                                    placeholder={t('channelName')}
                                    className="mb-2 form-control"
                                    innerRef={(el) => {
                                        if (!el) {
                                            return;
                                        }
                                        setInputRef(el);
                                    }}
                                />
                                <label htmlFor="channelname" className="visually-hidden">
                                    {t('channelName')}
                                </label>
                                <ErrorMessage name="channel" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>{t('cancel')}</Button>
                            <Button variant="primary" type="submit">{t('add')}</Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal >
    )
}
