const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(400).json({ error: 'Authorization not provided.' });

  const[_, authToken] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(authToken, process.env.AUTH_SECRET);
    req.userId = decoded.id;

    return next();
  } catch(e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}