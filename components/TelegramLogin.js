import { useEffect } from 'react';

const TelegramLogin = ({ onAuth }) => {
  useEffect(() => {
    // Append Telegram Login widget script to the page
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'gencedenHesenBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/telegram`);
    script.setAttribute('data-request-access', 'write');
    script.async = true;
    document.getElementById('telegram-login').appendChild(script);
  }, []);

  return <div id="telegram-login" />;
};

export default TelegramLogin;
