// components/TelegramAutoAuth.js
import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // To capture any errors

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      // Initialize Telegram Web App and check for user data
      const tg = window.Telegram.WebApp;
      tg.ready();

      // Log and check for initDataUnsafe
      console.log("Telegram WebApp initialized", tg);
      console.log("Telegram WebApp initDataUnsafe:", tg.initDataUnsafe);

      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setUser(tg.initDataUnsafe.user); // Set user data if available
      } else {
        setError("User data not available. Make sure you're launching the mini app within Telegram.");
      }
    } else {
      setError("Telegram WebApp is not accessible. Make sure this is running inside the Telegram app.");
    }
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : user ? (
        <h2>Hello, {user.first_name}!</h2>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TelegramAutoAuth;
