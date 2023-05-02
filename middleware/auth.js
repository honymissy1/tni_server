const jwt = require('jsonwebtoken');

const auth = async (req, res, next) =>{

  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.jwtSecret, (err, name) => {
          if (err) {
              return res.sendStatus(403);
          }

          next();
          console.log('It worked')
      });
  } else {
      res.status(401).json({error: 'Not Authorized'});
  }
}

module.exports = auth