const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Email sending server is running");
});

 console.log(process.env.Zap_Email);

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});