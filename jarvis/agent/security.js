const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

function applySecurity(app) {
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 30,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
}

module.exports = { applySecurity };
