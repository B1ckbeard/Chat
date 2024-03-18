import React from 'react';
import leoProfanity from 'leo-profanity';

const Message = ({ message }) => {
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      : {leoProfanity.clean(message.body)}
    </div>
  )
}

export default Message;
