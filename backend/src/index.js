const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("../generated/prisma");
const { MongoClient, ObjectId } = require("mongodb");

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
    const mongoUsers = await mongoDb
      .collection("users")
      .find()
      .project({ name: 1, email: 1, feedback: 1 })
      .toArray();

    // combine results
    const allUsers = [...sqlUsers, ...mongoUsers];

    res.json(allUsers);
  } catch (error) {
    console.log("ERROR FETCHING USERS", error);
    res.status(500).json({ error: "FAILED TO FETCH USERS FROM BOTH DBs" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    let newUser;

    if (feedback) {
      // insert into mongodb
      const result = await mongoDb
        .collection("users")
        .insertOne({ name, email, feedback });
      newUser = { _id: result.insertedId, name, email, feedback };
    } else {
      // insert into postgres
      newUser = await prisma.user.create({ data: { name, email } });
    }

    res.json(newUser);
  } catch (error) {
    console.log("ERROR INSERTING USER", error);
    res
      .status(500)
      .json({ error: "FAILED TO INSERT USER", details: error.message });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let mongoDeleted = 0;
    let pgDeleted = 0;

    // Try deleting from MongoDB
    try {
      if (ObjectId.isValid(id)) {
        const result = await mongoDb.collection("users").deleteOne({
          _id: new ObjectId(id),
        });
        mongoDeleted = result.deletedCount;
      }
    } catch (mongoErr) {
      console.warn("Mongo delete failed:", mongoErr.message);
    }

    // Try deleting from PostgreSQL
    try {
      const result = await prisma.user.deleteMany({
        where: { id: Number(id) || 0 },
      });
      pgDeleted = result.count;
    } catch (pgErr) {
      console.warn("Postgres delete failed:", pgErr.message);
    }

    // Decide final response
    if (mongoDeleted > 0 || pgDeleted > 0) {
      return res.json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
