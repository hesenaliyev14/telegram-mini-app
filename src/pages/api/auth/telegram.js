// pages/api/auth/telegram.js
import crypto from 'crypto';

export default function handler(req, res) {
  const { query } = req;

  // Step 1: Verify Telegram data authenticity
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secretKey = crypto.createHash('sha256').update(token).digest();

  const dataCheckString = Object.keys(query)
    .filter((key) => key !== 'hash')
    .sort()
    .map((key) => `${key}=${query[key]}`)
    .join('\n');
  
  const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  if (hash !== query.hash) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // Step 2: Successful login, extract user data
  const user = {
    id: query.id,
    first_name: query.first_name,
    last_name: query.last_name,
    username: query.username,
    photo_url: query.photo_url,
  };

  // Step 3: Save user session or token (implement according to your session handling)
  // For demonstration, we simply return user data
  res.status(200).json({ user });
}
