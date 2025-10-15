const passport = require('passport');
const jwt = require('jsonwebtoken');

const authenticateJWT = passport.authenticate('jwt', { session: false });

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
      }
    });
  }
  
  next();
};

module.exports = {
  authenticateJWT,
  optionalAuth
};