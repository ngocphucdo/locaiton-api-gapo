const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

//Import Routes
const postRouter = require("./routers/post");

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api", postRouter);

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(success => {
    console.log("Connected to DB");
  })
  .catch(error => {
    console.log("Error");
  });

app.get("/", (req, res) => {
  res.send(`<h1>Hello there</h1>`);
});

//Run Server
app.listen(3000, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("App listening at port 3000");
  }
});
