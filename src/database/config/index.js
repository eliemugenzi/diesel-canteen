require("dotenv/config");
const mongoose = require("mongoose");
const chalk = require("chalk");

const { log } = console;

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;

connection.once("open", () => {
  log(chalk.blue("The app and the database are now on the same page."));
});

connection.on("error", () => {
  log(halk.red("The Database connection error..."));
});
