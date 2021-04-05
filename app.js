const express = require("express");
require("dotenv/config");
const app = express();
const cors = require("cors");
const chalk = require("chalk");
require("./src/database/config");
const joiErrors = require("./src/middleware/joiErrors");

const api = require("./src/resources");

const { log } = console;

const { PORT = 9000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", api);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("*", (req, res) => {
  return res.status(404).json({
    status: 404,
    message: "Route Not Found",
  });
});

app.use((err, req, res) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});
app.use(joiErrors());

app.listen(PORT, () => {
  log(chalk.yellow(`App running on http://localhost:${PORT}`));
});

module.exports = app;
