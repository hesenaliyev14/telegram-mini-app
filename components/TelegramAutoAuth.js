// components/TelegramAutoAuth.js
import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeTelegramWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        const userData = tg.initDataUnsafe?.user;
        if (userData) {
          setUser(userData);
        } else {
          setError("User data not available. Make sure you're launching the mini app within Telegram.");
        }
      } else {
        setError("Telegram WebApp is not accessible. Make sure this is running inside the Telegram app.");
      }
    };

    // Try initializing Telegram WebApp immediately
    initializeTelegramWebApp();

    // Retry after a short delay if Telegram WebApp is still inaccessible
    const retryTimeout = setTimeout(() => {
      if (!user) initializeTelegramWebApp();
    }, 1000);

    return () => clearTimeout(retryTimeout);
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
