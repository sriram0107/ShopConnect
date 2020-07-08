const express = require("express");
const mongoose = require("mongoose");
const app = new express();
const user = require("./routes/user");
const cors = require("cors");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});
app.use(cors());
app.use(express.json());
app.use("/user", user);
app.listen(5001, () => console.log("API running on http://localhost:5001"));
