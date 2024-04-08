import React, { useContext } from 'react';
import { FilterContext } from '../../context/filterContext';

const Message = ({ message }) => {
  const filterProfanity = useContext(FilterContext);
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      :
      {' '}
      {filterProfanity(message.body)}
    </div>
  );
};

export default Message;
