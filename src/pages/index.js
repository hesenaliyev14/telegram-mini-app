// pages/index.js

import { useState } from 'react';
import TelegramLogin from '../../components/TelegramLogin';

export default function Home() {
  const [user, setUser] = useState(null);

  const handleAuth = (userData) => {
    setUser(userData);
  };

  return (
    <div>
      <h1>Welcome to the Telegram Mini App</h1>
      {user ? (
        <div>
          <h2>Hello, {user.first_name}</h2>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <TelegramLogin onAuth={handleAuth} />
      )}
    </div>
  );
}
