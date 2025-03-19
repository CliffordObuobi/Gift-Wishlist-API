import { UserModel } from "../models/user_model.js";
import jwt from 'jsonwebtoken';


// Registration of the User
export async function registerUser(req, res) {
  try {
    const user = new UserModel(value);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// User Login
export async function loginUser(req, res) {
  try {
    const user = await UserModel.findOne({ username: value.username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await user.comparePassword(value.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: "1h"});
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
