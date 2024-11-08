import { useEffect, useState } from 'react';

const TelegramAutoAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false); // Track if initialized

  useEffect(() => {
    // Load Telegram Web App script once
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
        
        if (!initialized) {
          tg.ready(); // Make sure WebApp is ready
          setInitialized(true); // Mark as initialized to avoid repeated initialization

          console.log("Telegram WebApp initialized:", tg);
          console.log("Telegram WebApp initData:", tg.initData);
          console.log("Telegram WebApp initDataUnsafe:", tg.initDataUnsafe);

          if (tg.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user); // Set user data if available
          } else {
            setError("User data not available. Ensure you’re running the mini app within Telegram.");
          }
        }

        // Handle main button visibility (avoid closing)
        tg.MainButton.setParams({
          text: "Start"
        }).show();

      } else {
        setError("Telegram WebApp is not accessible. Ensure this is running inside the Telegram app.");
      }
    };

    loadTelegramScript(); // Load script once on mount

    return () => {
      // Clean up on unmount
      setInitialized(false);
    };
  }, [initialized]); // Dependency on 'initialized' to avoid infinite initialization

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
