const https = require('https');

const url = 'https://unsplash.com/s/photos/gold-ring';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-?=&%]+/g;
    const matches = data.match(regex);
    if (matches && matches.length > 0) {
      console.log(`Found ${matches.length} image URLs:`);
      const unique = Array.from(new Set(matches)).slice(0, 30);
      unique.forEach((url, idx) => {
        console.log(`[${idx + 1}] ${url}`);
      });
    } else {
      console.log('No matches found.');
      console.log('HTML Snippet:', data.substring(0, 1000));
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
