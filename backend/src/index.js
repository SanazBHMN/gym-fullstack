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

app.get("/api/users", async (req, res) => {
  try {
    // fetch users form postgresql
    const sqlUsers = await prisma.user.findMany();

    // fetch users from mongodb
    const mongoUsers = await mongoDb.collection("users").find().toArray();

    // combine results
    const allUsers = [
      ...sqlUsers.map((user) => ({ ...user, source: "PostgreSQL" })),
      ...mongoUsers.map((user) => ({ ...user, sourc: "MongoDB" })),
    ];

    res.json(allUsers);
  } catch (error) {
    console.log("ERROR FETCHING USERS", error);
    res.status(500).json({ error: "FAILED TO FETCH USERS FROM BOTH DBs" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
