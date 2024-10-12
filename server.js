import mongoose from "mongoose";
import app from "./app.js";

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });
