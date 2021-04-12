import moment from 'moment';
import React from 'react';
import io from 'socket.io-client';

export default function Message({ users, messages, user, room, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const messageInput = (e) => setMessageValue(e.target.value)

  const onSendMessage = () => {
    const time = moment( new Date()).format("hh:MM:ss");
    io().emit('ROOM:NEW_MESSAGE', {
      user,
      room,
      text: messageValue,
      time: time
    });
    onAddMessage({ user, text: messageValue, time });
    setMessageValue('');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (    
    <div className="Message">
      <div className="Message-users">
        Room: <b>{room}</b>
        <hr />
        <b>Users online: {users.length}</b>
        {users.map((name, index) => (
            <div className="Message-user" key={name + index}>
              {name}
            </div>
          ))}
      </div>
      <div className="Message-messages">
        <div 
          ref={messagesRef} 
          className="messages"
        >
          {messages.map((message, index) => (
            <div key={message.user + index} className="message">              
              <div className="message-inform">
                <span>{message.user}</span>
                <span>{message.time}</span>
              </div>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form>
          <textarea
            value={messageValue}
            onChange={messageInput}
            className="form-control"
            rows="2"/>
          <button 
            onClick={onSendMessage} 
            type="button" 
            className="btn btn-primary"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}