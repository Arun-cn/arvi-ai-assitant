import "./config/config.js"; // Ensure this is imported before anything else
import express from "express";
import bot from "./src/bot/bot.js";

// Creating an instance of Express application
const app = express();

// Defining the port number for the server
const port = 3000;

// Handling bot polling errors
bot.on("polling_error", (error) => {
  console.log(`Polling error: ${error}`);
});

// Defining a GET route for the root path
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
