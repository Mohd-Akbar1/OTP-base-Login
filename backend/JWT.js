const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log('fi')
  if (!token) return res.sendStatus(203)

  jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log('si')
    if (err) return res.sendStatus(201)
        console.log('ti')
    req.user = user;
    next();
  });
};

module.exports=authenticateToken