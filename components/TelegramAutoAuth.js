import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeTelegramWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        tg.ready();

        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user);
        } else {
          setError("User data not available. Please ensure you’re running the mini app within Telegram.");
        }
        // tg.MainButton.setParams({
        //   text: "Start"
        // }).show();
      } else {
        setError("Telegram WebApp is not accessible. Make sure this is running inside the Telegram app.");
      }
    };

    if (!window.Telegram?.WebApp) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      script.onload = initializeTelegramWebApp;
      script.onerror = () => setError("Failed to load Telegram WebApp script.");
      document.body.appendChild(script);
    } else {
      initializeTelegramWebApp();
    }

  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : user ? (
        <>
            <h2>Hello, {user.first_name}  {user.last_name}!</h2>
            <h3>Usernaem, {user.username}</h3>
            <p>id: {user.id}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TelegramAutoAuth;