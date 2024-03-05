import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Modal, Button } from "react-bootstrap";
import * as Yup from 'yup';
import ioClient from "./../../servicesSocket/socket";
import { selectors as channelSelectors } from './../../store/channelsSlice'

export const RenameChannelModal = ({ show, onHide, channel }) => {
    const channels = useSelector(channelSelectors.selectAll);
    const [inputRef, setInputRef] = useState();

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
            .required('Channel Name is required')
            .min(3, ('minimum 3 characters'))
            .max(20, ('maximum 20 characters'))
            .notOneOf(channels.map((currentChannel) => (currentChannel.name)))
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
                            <Modal.Title>Переименовать канал</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Field
                                    name="channelName"
                                    aria-label="Имя канала"
                                    placeholder="Имя канала"
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
                                    Переименовать
                                </label>
                                <ErrorMessage name="channelName" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Отменить
                            </Button>
                            <Button variant="primary" type="submit">
                                Отправить
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
