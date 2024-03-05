import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import ioClient from '../../servicesSocket/socket';
import { UserContext } from '../../context/context';
// import { addMessage } from '../../store/messagesSlice';


const MessageForm = () => {
    const { currentChannelId } = useSelector((state) => state.channels);
    const context = useContext(UserContext);
    // const dispatch = useDispatch();

    return <Formik
        initialValues={{
            message: '',
        }}
        onSubmit={(values, { resetForm }) => {
            try {
                if (values.message.length > 0) {
                    ioClient.emit('newMessage', { channelId: currentChannelId, body: values.message, username: context.username });
                    resetForm();
                }
            }
            catch (e) {
                console.error(e);
            }
        }}
    >
        {({ errors, touched }) => (
            <Form noValidate="" className="py-1 border rounded-2">
                <div className="input-group has-validation">
                    <Field name="message" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
                    <button type="submit" disabled="" className="btn btn-group-vertical">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                        </svg>
                        <span className="visually-hidden">Отправить</span>
                    </button>
                </div>
            </Form>
        )}
    </Formik>
}

export default MessageForm;