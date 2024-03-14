import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal, Button } from "react-bootstrap";
import * as Yup from 'yup';
import ioClient from "./../../servicesSocket/socket";
import { selectors as channelSelectors } from './../../store/channelsSlice'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const RenameChannelModal = ({ show, onHide, channel }) => {
    const channels = useSelector(channelSelectors.selectAll);
    const [inputRef, setInputRef] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        if (inputRef) {
            inputRef.focus();
        }
    }, [inputRef]);

    if (!channel) {
        return null;
    }

    const validationSchema = Yup.object().shape({
        channelName: Yup
            .string()
            .required(t('errors.required'))
            .min(3, t('errors.min3'))
            .max(20, t('errors.max'))
            .notOneOf(channels.map((currentChannel) => (currentChannel.name)), t('errors.uniq'))
    });

    return (
        <Modal show={show}>
            <Formik
                initialValues={{
                    channelName: channel.name,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    try {
                        ioClient.emit('renameChannel', { id: channel.id, name: values.channelName });
                        toast.success(t('toast.channelRenamed'));
                        resetForm();
                        onHide();
                    } catch (e) {
                        console.error(e);
                    }
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form>
                        <Modal.Header closeButton onHide={onHide}>
                            <Modal.Title>{t('renameChannel')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Field
                                    name="channelName"
                                    aria-label={t('channelName')}
                                    placeholder={t('channelName')}
                                    className="mb-2 form-control"
                                    value={values.channelName}
                                    onChange={handleChange}
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
                                <ErrorMessage name="channelName" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                {t('cancel')}
                            </Button>
                            <Button variant="primary" type="submit">
                                {t('rename')}
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
