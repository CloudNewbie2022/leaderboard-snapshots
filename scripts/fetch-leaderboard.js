// scripts/fetch-leaderboard.js
const fs = require('fs');
const https = require('https');

// Replace this with your actual API endpoint
const url = 'https://example.com/api/leaderboard';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `snapshots/snapshot-${timestamp}.json`;

    fs.mkdirSync('snapshots', { recursive: true });
    fs.writeFileSync(filename, data);
    console.log('✅ Snapshot saved as', filename);
  });
}).on('error', err => {
  console.error('❌ Error fetching leaderboard:', err);
});
