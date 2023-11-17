const jwt = require('jsonwebtoken');

const JWT_SECRET = "TheIndustrialRevolutionAndItsConsequencesHaveBeenADisasterForTheHumanRace";//change this to an evniroment variable later
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Bearer <token>
    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(111).json({ error: 'Unauthorized access: Invalid token' });
        }
        req.user = decoded; // Add the decoded token to the request for use in your routes
        next();
      });
    } else {
      res.status(222).json({ error: 'A token is required for authentication' });
    }
  };

module.exports = verifyToken;