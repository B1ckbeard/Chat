import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../context/context';
import ioClient from '../../servicesSocket/socket';
import { selectors as channelSelectors } from './../../store/channelsSlice'

export const AddChannelModal = ({ show, onHide }) => {
    const context = useContext(UserContext);
    const channels = useSelector(channelSelectors.selectAll);
    const [inputRef, setInputRef] = useState();

    useEffect(() => {
        if (inputRef) {
            inputRef.focus();
        }
    }, [inputRef]);

    const validationSchema = Yup.object().shape({
        channel: Yup
            .string()
            .required('Channel Name is required')
            .min(3, ('minimum 3 characters'))
            .max(20, ('maximum 20 characters'))
            .notOneOf(channels.map((currentChannel) => (currentChannel.name)))
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
                            <Modal.Title>Добавить канал</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Field
                                    name="channel"
                                    aria-label="Имя канала"
                                    placeholder="Имя канала"
                                    className="mb-2 form-control"
                                    innerRef={(el) => {
                                        if (!el) {
                                            return;
                                        }
                                        setInputRef(el);
                                    }}
                                />
                                <label htmlFor="channelname" className="visually-hidden">
                                    Имя канала
                                </label>
                                <ErrorMessage name="channel" />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>Отменить</Button>
                            <Button variant="primary" type="submit">Отправить</Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal >
    )
}
