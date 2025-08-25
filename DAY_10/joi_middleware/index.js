const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());
const middleware = require("./middleware")


app.use(express.json())
app.post("/Signup", middleware, (req, res) => {
    res.send("Successfully Signup");
  
});

app.listen(3000, () => {
  console.log("Server is listning on http://localhost:3000");
});
