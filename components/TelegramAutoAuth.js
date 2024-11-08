import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeTelegramWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;

        tg.ready(); // Make sure WebApp is ready

        console.log("Telegram WebApp initialized:", tg);
        console.log("Telegram WebApp initData:", tg.initData);
        console.log("Telegram WebApp initDataUnsafe:", tg.initDataUnsafe);

        if (tg.initDataUnsafe?.user) {
          setUser(tg.initDataUnsafe.user); // Set user data if available
        } else {
          setError("User data not available. Please ensure you’re running the mini app within Telegram.");
        }

        // Handle main button visibility
        tg.MainButton.setParams({
          text: "Start"
        }).show();
      } else {
        setError("Telegram WebApp is not accessible. Make sure this is running inside the Telegram app.");
      }
    };

    // Load Telegram Web App script if not already loaded
    if (!window.Telegram?.WebApp) {
      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-web-app.js';
      script.async = true;
      script.onload = initializeTelegramWebApp;
      script.onerror = () => setError("Failed to load Telegram WebApp script.");
      document.body.appendChild(script);
    } else {
      // If script is already loaded, directly initialize
      initializeTelegramWebApp();
    }

  }, []); // Empty dependency array ensures it runs only once on mount

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