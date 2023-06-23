const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const teamRouter = require("./Routes/dataRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(multer().array())
//ROUTES
app.use("/api/v1/teams", teamRouter);
module.exports = app;
