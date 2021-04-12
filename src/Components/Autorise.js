import React from 'react';
import axios from 'axios';

export default function Autorise({ onLogin }) {
  const [room, setRoom] = React.useState('');
  const [user, setUser] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const roomInput = (e) => setRoom(e.target.value);
  const userInput = (e) => setUser(e.target.value);

  const onEnter = async () => {
    if (!room || !user) {
      return alert('Empty input fields');
    };
    const obj = {
      room,
      user,
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onLogin(obj);
  };

  return (
    <div className="auth">
      <input
        type="text"
        placeholder="Room Name"
        value={room}
        onChange={roomInput}
      />
      <input
        type="text"
        placeholder="User name"
        value={user}
        onChange={userInput}
      />
      <button
        disabled={isLoading} 
        onClick={onEnter} 
        className="btn btn-primary"
      >
        {
          isLoading 
            ? 'Join...' 
            : 'Go!'
        }
      </button>
    </div>
  );
}