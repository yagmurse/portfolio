import User from "../models/UserModel.js";
import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { verifyJWT } from "../utils/tokenUtils.js";
const oneDay = 1000 * 60 * 60 * 24;

export const Login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const isMatch = await comparePasswords(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
  const token = createJWT({ userId: user._id, role: user.role });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(201).json({
    msg: `${user.username} logged in successfully`,
    user: { username: user.username },
  });
};

export const Register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Username and password are required" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const isFirstAccount = (await User.countDocuments()) === 0;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: isFirstAccount ? "admin" : "user",
    });

    await newUser.save();
    const token = createJWT({ userId: newUser._id, role: newUser.role });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({
      msg: "User registered successfully",
      user: { username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error registering new user", error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong during logout" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = verifyJWT(token);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
