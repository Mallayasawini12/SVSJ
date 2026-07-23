const https = require('https');

const ids = [
  '1618403088890-3d9ff6f4c8da', // close up of gold rings
  '1628228470551-2bccca5b699a',
  '1629224316810-9d8805b95e76', // gold ring on finger
  '1606293926075-69a0ec159656', // gold jewelry ring
  '1535632066927-ab7c9ab60908', // Kasu Mala detail (gold)
  '1515562141207-7a88fb7ce338', // general gold
  '1605100804763-247f67b3557e', // stack of gold rings
  '1603561591411-07134e71a2a9',  // peacock ring
  '1622398925373-3f91b1e275f5'   // ornate gold rings on stands (Zadu)
];

function testId(id) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;
  https.get(url, (res) => {
    console.log(`ID: ${id} -> Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Error for ${id}:`, err.message);
  });
}

ids.forEach(testId);
