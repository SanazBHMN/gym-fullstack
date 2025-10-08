const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("../generated/prisma");

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("GYM API IS RUNNING...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
