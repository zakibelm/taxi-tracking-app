const http = require('http');
const port = process.env.PORT || 3001;

http
  .get(`http://localhost:${port}/health`, res => {
    if (res.statusCode === 200) process.exit(0);
    else process.exit(1);
  })
  .on('error', () => process.exit(1));
