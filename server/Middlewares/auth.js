const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.sendStatus(401).json({ message: "User not authorized!" });
  else {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err)
        return res.sendStatus(403).json({ message: "Token not verified!" });
      else req.tokenData = decoded;
      next();
    });
  }
}

module.exports = validateToken;
