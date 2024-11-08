import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Dynamically load Telegram Web App JS
    const loadTelegramScript = () => {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      script.onload = () => initializeTelegramWebApp(); // Initialize once script is loaded
      document.body.appendChild(script);
    };

    const initializeTelegramWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();

        console.log("Telegram WebApp initialized:", tg);
        console.log("Telegram WebApp initData:", tg.initData);
        console.log("Telegram WebApp initDataUnsafe:", tg.initDataUnsafe);

        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user); // Set user data if available
        } else {
          setError("User data not available. Ensure you’re running the mini app within Telegram.");
        }
      } else {
        setError("Telegram WebApp is not accessible. Ensure this is running inside the Telegram app.");
      }
    };

    loadTelegramScript();

    const retryTimeout = setTimeout(() => {
      if (!user) initializeTelegramWebApp();
    }, 1000);

    return () => clearTimeout(retryTimeout);
  }, [user]);

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
