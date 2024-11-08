// components/TelegramAutoAuth.js
import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      // Initialize the Telegram Web App
      const tg = window.Telegram.WebApp;
      tg.ready();

      // Access user data directly
      const userData = tg.initDataUnsafe?.user;
      if (userData) {
        setUser(userData); // Set the user data
      }
    }
  }, []);

  return (
    <div>
      {user ? (
        <h2>Hello, {user.first_name}!</h2>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TelegramAutoAuth;
