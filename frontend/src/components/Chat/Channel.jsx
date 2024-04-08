import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as modalActions } from '../../store/modalSlice';
import { FilterContext } from '../../context/filterContext';

const Channel = ({ channel, currentChannelId, ...handlers }) => {
  const dispatch = useDispatch();
  const { onChannelSelect } = handlers;
  const { id, name, removable } = channel;
  const { t } = useTranslation();
  const filterProfanity = useContext(FilterContext);
  return (
    <li key={id} className="nav-item w-100">
      {!removable
        && (
          <Button
            type="button"
            variant={id === currentChannelId ? 'secondary' : ''}
            key={id}
            className="w-100 rounded-0 text-start"
            onClick={() => onChannelSelect(id)}
          >
            <span className="me-1">#</span>
            {filterProfanity(name)}
          </Button>
        )}
      {removable
        && (
          <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
            <Button
              onClick={() => onChannelSelect(id)}
              variant={id === currentChannelId ? 'secondary' : ''}
              className="w-100 rounded-0 text-start text-truncate"
            >
              <span className="me-1">#</span>
              {filterProfanity(name)}
            </Button>
            <Dropdown.Toggle split variant={id === currentChannelId ? 'secondary' : ''}>
              <span className="visually-hidden">{t('channelControl')}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  dispatch(modalActions.openModal({ modalType: 'remove', channel }));
                }}
              >
                {t('delete')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  dispatch(modalActions.openModal({ modalType: 'rename', channel }));
                }}
              >
                {t('rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </li>
  );
};

export default Channel;
