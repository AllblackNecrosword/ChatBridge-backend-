const Signup = require("../Models/signupModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const time = 1 * 24 * 60 * 60;

const createtoken = (id) => {
  return jwt.sign({ id }, "koshishkhadka", {
    expiresIn: time,
  });
};


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json("Please fill up the forms");
    }

    // Check if the email is already taken
    const checkuser = await Signup.findOne({ email });
    if (checkuser) {
      return res.status(302).json({ message: "Email already taken" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const createuser = await Signup.create({
      username,
      email,
      password: hash,
    });

    const token = createtoken(createuser._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: time * 1000,
    });

    if (createuser) {
      return res
        .status(201)
        .json({ createuser: createuser._id, created: true });
    } else {
      return res.status(400).json({ message: "Error creating new user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    if (!email || !password) {
      res.status(404).json({ message: "Fill up the details" });
    }
    const user = await Signup.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email not found" });
    }

    const comparepassword = bcrypt.compareSync(password, user.password);
    if (!comparepassword) {
      res.status(404).json({ message: "Invalid Password" });
    }
    const token = createtoken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: time * 1000,
    });
    if (user) {
      return res.status(201).json({ user, created: true });
    } else {
      return res.status(400).json({ message: "Faild to login" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
