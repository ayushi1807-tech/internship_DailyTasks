const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.get("/contact", (req, res) => {
  res.send("Contact Page...");
});

app.get("/About", (req, res) => {
  res.send("<h1>This is About Page...</h1>");
});

app.listen(PORT, () => {
  console.log(`server is running on port : http://localhost:${PORT}`);
});
