import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Session from "../models/session.model.js";

export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await User.findOne({ username, email });
  if (existingUser) {
    return res.status(400).json({ message: "Username, email already taken" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedpassword, role });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const session = await Session.create({ user_id: user._id });
  const { password: _, ...userInfo } = user.toObject();

  return res.json({
    token: session._id,
    user: userInfo,
    message: "Login successful",
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const getAdminData = async (req, res) => {
  try {
    const adminUsers = await User.find({ role: "admin" }, "-password");
    res.json(adminUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin users", error });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (
      req.user.role === "admin" &&
      updateData.role &&
      updateData.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Admin cannot change their own role" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
