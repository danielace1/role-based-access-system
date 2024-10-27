import express from "express";
import {
  getAdminData,
  getAllUsers,
  getUserById,
  login,
  registerUser,
  updateUserById,
} from "../controllers/user.controller.js";
import checkMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/admin", checkMiddleware, (req, res) => {
  res.send("Welcome to the admin panel.");
});

router.get("/user", checkMiddleware, (req, res) => {
  res.send("Welcome to the user area.");
});

router.get("/superadmin", checkMiddleware, (req, res) => {
  const uriTest = req.baseUrl;

  res.send(uriTest);
});

router.get("/users", checkMiddleware, getAllUsers);
router.get("/user/:id", checkMiddleware, getUserById);
router.get("/admin/data", checkMiddleware, getAdminData);

router.put("/user/:id", checkMiddleware, updateUserById);

export default router;
