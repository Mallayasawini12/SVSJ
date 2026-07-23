const https = require('https');

const id = '1617038260897-41a1f14a8ca0';
const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

https.get(url, (res) => {
  console.log(`ID: ${id} -> Status: ${res.statusCode}`);
}).on('error', (err) => {
  console.error(`Error:`, err.message);
});
