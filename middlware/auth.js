const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer")) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const token = header.split(" ")[1];
  if(!token) {
    res.status(403).json({message: "No token provided"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
