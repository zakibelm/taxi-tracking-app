import rateLimit from 'express-rate-limit';

export function security(app) {
  app.use(rateLimit({ windowMs: 60 * 1000, max: 30 }));
}
