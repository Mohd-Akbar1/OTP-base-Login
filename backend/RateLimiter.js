const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  msg: 'Too many requests from this IP, please try again after 10 minutes'
});

module.exports = limiter;
