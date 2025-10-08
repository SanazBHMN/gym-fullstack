const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("../generated/prisma");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB setup
let mongoClient;
let mongoDb;

async function connectMongo() {
  try {
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    await mongoClient.connect();
    mongoDb = mongoClient.db();
    console.log("CONNECTED TO MONGODB");
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED", error);
  }
}

connectMongo();

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("GYM API IS RUNNING...");
});

app.get("/mongo-test", async (req, res) => {
  console.log("/mongo-test route hit");
  try {
    const users = await mongoDb.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "MONGODB FETCH FAILED" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
