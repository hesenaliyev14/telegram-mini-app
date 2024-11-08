// pages/index.js
import TelegramAutoAuth from '../../components/TelegramAutoAuth';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Telegram Mini App</h1>
      <TelegramAutoAuth />
    </div>
  );
}
