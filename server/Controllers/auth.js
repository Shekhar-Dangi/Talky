const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (data) => {
  return jwt.sign(data, process.env.TOKEN_KEY, { expiresIn: "25h" });
};

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // Checks if old user is present
  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(409).json({ message: "User already exists!" });

  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    image: `http://localhost:8000/${req.file.filename}`
  });
  const token = generateToken(
    { email, name: user.name },
    process.env.TOKEN_KEY,
    {
      expiresIn: "25h",
    }
  );
  res.status(200).json({ token });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password))
    return res.status(400).send("All input is required");
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User does not exists!" });
  if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
    const token = generateToken(
      { email, name: user.name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "25h",
      }
    );
    res.status(200).json({ token });
  } else res.status(401).json({ message: "Invalid Password!" });
};
module.exports = { register, login };
