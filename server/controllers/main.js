require("dotenv").config();
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ msg: "Please provide username and password" });
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET);

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => { 
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${username}`,
      secret: `Here is your authorized access to dashboard with a secret number ${luckyNumber}`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  dashboard,
};
