// One-off helper. Usage (from the backend folder):
//   YOCO_SECRET_KEY=sk_live_xxx node scripts/register-yoco-webhook.js register https://devahiti-booking-system-4t96.onrender.com/api/payments/webhook
//   YOCO_SECRET_KEY=sk_live_xxx node scripts/register-yoco-webhook.js list
// "register" prints the signing secret ONCE (starts with whsec_). Put it in Render as YOCO_WEBHOOK_SECRET.
import axios from 'axios';

const key = process.env.YOCO_SECRET_KEY;
const [cmd, url] = process.argv.slice(2);
if (!key || !['register', 'list'].includes(cmd) || (cmd === 'register' && !url)) {
  console.error('Usage: YOCO_SECRET_KEY=... node scripts/register-yoco-webhook.js register <url> | list');
  process.exit(1);
}
const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
try {
  if (cmd === 'register') {
    const r = await axios.post('https://payments.yoco.com/api/webhooks', { name: 'devahiti-booking', url }, { headers });
    console.log(JSON.stringify(r.data, null, 2));
    console.log('\nCopy the "secret" value into Render as YOCO_WEBHOOK_SECRET.');
  } else {
    const r = await axios.get('https://payments.yoco.com/api/webhooks', { headers });
    console.log(JSON.stringify(r.data, null, 2));
  }
} catch (e) {
  console.error('Failed:', e.response?.status, JSON.stringify(e.response?.data || e.message));
  process.exit(1);
}
