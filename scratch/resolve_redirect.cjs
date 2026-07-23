const http = require('http');
const https = require('https');

const targetUrl = 'https://unsplash.com/photos/kL59y5e-6-E';

function fetch(url) {
  const protocol = url.startsWith('https') ? https : http;
  console.log(`Fetching: ${url}`);
  protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Headers:', res.headers);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (!nextUrl.startsWith('http')) {
          const parsed = new URL(url);
          nextUrl = `${parsed.protocol}//${parsed.host}${nextUrl}`;
        }
        fetch(nextUrl);
      } else {
        const regex = /https:\/\/images\.unsplash\.com\/photo-[0-9a-fA-F-]+/g;
        const matches = data.match(regex);
        if (matches && matches.length > 0) {
          console.log('Found image URLs:', Array.from(new Set(matches)));
        } else {
          console.log('Snippet:', data.substring(0, 1000));
        }
      }
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
}

fetch(targetUrl);
