import express from "express";
import {
  getAdminData,
  getAllUsers,
  getUserById,
  login,
  registerUser,
  updateUserById,
} from "../controllers/user.controller.js";
import middelware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.get(
  "/admin",
  middelware(["admin"], (req, res) => {
    res.send("Welcome to the admin panel.");
  })
);

router.get("/user", middelware(["user", "admin"]), (req, res) => {
  res.send("Welcome to the user area.");
});

router.get(
  "/superadmin",
  middelware(["superadmin"], (req, res) => {
    res.send("Welcome to the superadmin panel.");
  })
);

router.get("/users", middelware(["admin", "superadmin"]), getAllUsers);
router.get("/user/:id", middelware(["admin", "superadmin"]), getUserById);
router.get("/admin/data", middelware(["superadmin"]), getAdminData);

router.put("/user/:id", middelware(["admin", "superadmin"]), updateUserById);

export default router;
