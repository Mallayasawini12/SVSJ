const https = require('https');

const query = encodeURIComponent('gold ring');
const url = `https://unsplash.com/napi/search/photos?query=${query}&per_page=20`;

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.results && json.results.length > 0) {
        console.log(`Found ${json.results.length} images:`);
        json.results.forEach((photo, idx) => {
          console.log(`[${idx + 1}] ID: ${photo.id}`);
          console.log(`    Description: ${photo.description || photo.alt_description}`);
          console.log(`    Regular URL: ${photo.urls.regular}`);
          console.log(`    Thumb URL: ${photo.urls.thumb}`);
          console.log('');
        });
      } else {
        console.log('No results found.');
      }
    } catch (e) {
      console.error('Failed to parse JSON:', e.message);
      console.log('Raw data snippet:', data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error('Request failed:', err.message);
});
