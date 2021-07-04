const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      res.status(401).json({message: "Нет авторизации!"})
    }

    const decodedUserData = jwt.decode(token, 'test')

    req.user = decodedUserData;
    next();
  } catch (e) {
    res.status(401).json({message: "Нет авторизации!"})
  }
};
