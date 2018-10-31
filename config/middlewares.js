const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.get('Authorization');
  const jwtKey = 'th4t.s-mY-s3crEt-cPtn-i.M-alW4y5-4nGryy';

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

module.exports = { authenticate };