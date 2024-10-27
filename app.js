import express from "express";
import "dotenv/config";
import router from "./routes/route.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World! Role based access");
});

export default app;
