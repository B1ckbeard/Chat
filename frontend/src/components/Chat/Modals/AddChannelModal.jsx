import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { UserContext } from '../../../context/userContext';
import { SocketContext } from '../../../context/socketContext';
import { FilterContext } from '../../../context/filterContext';
import { selectors as channelSelectors } from '../../../store/channelsSlice';

const AddChannelModal = ({ show, onHide }) => {
  const userContext = useContext(UserContext);
  const filterProfanity = useContext(FilterContext);
  const { createChannel } = useContext(SocketContext);
  const channels = useSelector(channelSelectors.selectAll);
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    channel: Yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.min3'))
      .max(20, t('errors.max'))
      .notOneOf(channels.map((currentChannel) => (currentChannel.name)), t('errors.uniq')),
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Formik
        initialValues={{
          channel: '',
          username: userContext.username,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            const newChannel = {
              name: filterProfanity(values.channel.trim()), username: values.username,
            };
            createChannel(newChannel);
            toast.success(t('toast.channelCreated'));
            resetForm();
            onHide();
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {({
          errors, values, handleChange, handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton onHide={onHide}>
              <Modal.Title>{t('addChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Floating className="mb-3">
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder={t('channelName')}
                  name="channel"
                  id="channel"
                  autoComplete="channelName"
                  value={values.channel}
                  onChange={handleChange}
                  isInvalid={errors.channel}
                />
                <label htmlFor="channel">{t('channelName')}</label>
                <Form.Control.Feedback type="invalid">
                  {errors.channel}
                </Form.Control.Feedback>
              </Form.Floating>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>{t('cancel')}</Button>
              <Button variant="primary" type="submit">{t('add')}</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddChannelModal;
