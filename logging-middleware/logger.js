const dotenv = require('dotenv');
dotenv.config();
function logger(req, res, next) {
  const logData = {
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    clientID: req.headers.clientid || process.env.CLIENT_ID || 'undefined',
    clientSecret: req.headers.clientsecret || process.env.CLIENT_SECRET || 'undefined'
  };
  console.log('[LOG]', logData);
  next();
}
module.exports = logger;
