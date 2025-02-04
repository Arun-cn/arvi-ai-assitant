import "./config.js"; // Ensure this is imported before anything else
import express from "express";
import bot from "./bot.js";

const app = express();
const port = 3000;

bot.on("polling_error", (error) => {
  console.log(`Polling error: ${error}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
