require("dotenv").config();
const express = require("express");
const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const stdRouter = require("./Routes/studentRoutes");

app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("👏 Connection Successfull"))
  .catch((err) => console.log("👎 Connection Failed", err));

app.use("/student", stdRouter);

app.listen(PORT, () => {
  console.log(`🚀 server is Running on http://localhost:${PORT}`);
});
