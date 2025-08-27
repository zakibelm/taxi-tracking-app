import http from 'http';

const req = http.get('http://localhost:3001/health', res => {
  res.statusCode === 200 ? process.exit(0) : process.exit(1);
});
req.on('error', () => process.exit(1));
setTimeout(() => process.exit(1), 5000);
