const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mainRoute = require("./routes/main");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/ErrorHandler");
const cors = require("cors");
//middleware
app.use(cors());

app.use(express.json()); 
app.use("/api/v1", mainRoute);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(5000, console.log("Sever listening on port 5000..."));
  } catch (error) {
    console.log(error);
  }
};

start();
