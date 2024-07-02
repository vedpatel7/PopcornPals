const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successful", user: user });
      } else {
        res.send({ message: "Incorrect password" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error checking user:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const newUser = new User({
        name: name,
        email: email,
        password: password
      });

      await newUser.save();
      res.send({ message: "Successfully registered" });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send("Internal Server Error");
  }
};
