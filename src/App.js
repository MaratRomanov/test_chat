import React from 'react';
import axios from 'axios';
import reducer from './reducer';
import Autorise from './Components/Autorise';
import Message from './Components/Message';
import io from 'socket.io-client';

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    io().emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  React.useEffect(() => {
    io().on('ROOM:SET_USERS', setUsers);
    io().on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  return (
    <div className="app">
      {
        !state.joined 
          ? <Autorise onLogin={onLogin} />
          : <Message {...state} onAddMessage={addMessage} />
      }
    </div>
  );
}