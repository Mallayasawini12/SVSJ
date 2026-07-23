const http = require('http');
const https = require('https');

const ids = ['kL59y5e-6-E', 'u85bY4j-k8w', 'v_n7Lw64560'];

function resolveDownload(photoId) {
  const url = `https://unsplash.com/photos/${photoId}/download?force=true`;
  console.log(`Resolving download for: ${photoId}`);

  function getUrl(targetUrl) {
    const protocol = targetUrl.startsWith('https') ? https : http;
    protocol.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      console.log(`[${photoId}] Status: ${res.statusCode}`);
      if (res.headers.location) {
        console.log(`[${photoId}] Location: ${res.headers.location}`);
        if (res.headers.location.includes('images.unsplash.com')) {
          console.log(`[${photoId}] FOUND DIRECT URL: ${res.headers.location}`);
        } else {
          let nextUrl = res.headers.location;
          if (!nextUrl.startsWith('http')) {
            const parsed = new URL(targetUrl);
            nextUrl = `${parsed.protocol}//${parsed.host}${nextUrl}`;
          }
          getUrl(nextUrl);
        }
      } else {
        console.log(`[${photoId}] No redirect. Headers:`, res.headers);
      }
    }).on('error', (err) => {
      console.error(`[${photoId}] Error:`, err.message);
    });
  }

  getUrl(url);
}

ids.forEach(resolveDownload);
