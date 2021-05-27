const express = require("express");
const app = express();
const userroutes = require("./routes/user");
const cors = require("cors");
app.use(cors());
//mongodb
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
app.use(passport.initialize());

const db = process.env.mongodburl;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb got connected");
  })
  .catch((err) => console.log(err));

//bodyparser
app.use(express.json());

app.use("/users", userroutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("server started on $(PORT)"));
