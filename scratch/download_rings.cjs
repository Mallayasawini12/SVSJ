const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { id: 'kL59y5e-6-E', filename: 'gold_ring_3.png' }, // Zayed Ahmed Zadu: Ornate gold rings on stands
  { id: 'u85bY4j-k8w', filename: 'gold_ring_4.png' }, // Milad Fakurian: Gold ring with green gemstones
  { id: 'v_n7Lw64560', filename: 'gold_ring_5.png' }  // Mariano Rivas: Gold ring on white textile
];

const publicDir = 'c:\\Users\\lenovo\\OneDrive\\Desktop\\SVSJ (2)\\public';

function downloadImage(photoId, filename) {
  const dest = path.join(publicDir, filename);
  const file = fs.createWriteStream(dest);
  const url = `https://unsplash.com/photos/${photoId}/download?force=true`;

  console.log(`Starting download for ${photoId} -> ${filename}`);

  function getUrl(targetUrl) {
    https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        getUrl(res.headers.location);
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Successfully downloaded: ${filename} (${fs.statSync(dest).size} bytes)`);
        });
      } else {
        console.error(`Failed to download ${photoId}. Status code: ${res.statusCode}`);
        file.close();
        fs.unlinkSync(dest);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${photoId}:`, err.message);
      file.close();
      fs.unlinkSync(dest);
    });
  }

  getUrl(url);
}

images.forEach(img => downloadImage(img.id, img.filename));
