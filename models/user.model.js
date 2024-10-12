import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long."],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(v);
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please fill a valid email address"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
