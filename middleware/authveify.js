const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
      // Split the 'Bearer <token>' format and extract the token
      const token = authHeader.split(' ')[1];

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'book secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}};

module.exports = { requireAuth };