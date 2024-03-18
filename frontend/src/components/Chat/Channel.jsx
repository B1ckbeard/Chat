import React from 'react';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

const Channel = ({ channel, currentChannelId, onChannelSelect, onChannelRemove, onChannelRename }) => {
  const { id, name, removable } = channel;
  const { t } = useTranslation();
  return (
    <li key={id} className="nav-item w-100">
      {!removable &&
          <Button
            type="button"
            variant={id === currentChannelId ? 'secondary' : null}
            key={id}
            className="w-100 rounded-0 text-start"
            onClick={() => onChannelSelect(id)}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
      }
      {removable &&
        <Dropdown as={ButtonGroup}>
          <Button onClick={() => onChannelSelect(id)} variant={id === currentChannelId ? 'secondary' : null}>
            <span className='me-1'>#</span> {leoProfanity.clean(name)}
          </Button>
          <Dropdown.Toggle split variant={id === currentChannelId ? 'secondary' : null} id="channelControl"/>
          <label className="visually-hidden" htmlFor="channelControl">{t('channelControl')}</label>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onChannelRemove(id)}>{t('delete')}</Dropdown.Item>
            <Dropdown.Item onClick={() => onChannelRename(channel)}>{t('rename')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
    </li>
  );
};

export default Channel;
