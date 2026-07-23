const https = require('https');

const photoIds = ['kL59y5e-6-E', 'u85bY4j-k8w'];

function getDirectUrl(photoId) {
  const url = `https://unsplash.com/photos/${photoId}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      // Look for images.unsplash.com/photo- in the HTML
      const regex = new RegExp(`https://images\\.unsplash\\.com/photo-[0-9a-fA-F-]+`, 'g');
      const matches = data.match(regex);
      if (matches && matches.length > 0) {
        console.log(`Resolved ID: ${photoId} -> ${matches[0]}`);
      } else {
        console.log(`Failed to resolve ID: ${photoId}`);
        // Let's print out if there's a redirection or snippet
        if (res.headers.location) {
          console.log(`Redirects to: ${res.headers.location}`);
        } else {
          console.log('Snippet:', data.substring(0, 500));
        }
      }
    });
  }).on('error', (err) => {
    console.error(`Error for ${photoId}:`, err.message);
  });
}

photoIds.forEach(getDirectUrl);
