const { MongoClient } = require("mongodb");
require("dotenv").config();

async function seedMongo() {
  const client = new MongoClient(process.env.MONGODB_URL);

  try {
    await client.connect();
    const db = client.db();

    // Classes
    await db.collection("classes").insertMany([
      { name: "TRX", trainerName: "Mira", schedule: new Date() },
      { name: "Crossfit", trainerName: "Leo", schedule: new Date() },
    ]);

    // Bookings
    await db.collection("bookings").insertMany([
      { userEmail: "sanaz@example.com", workoutName: "TRX", date: new Date() },
      {
        userEmail: "solmaz@example.com",
        workoutName: "Crossfit",
        date: new Date(),
      },
    ]);

    // Feedback
    await db.collection("feedback").insertMany([
      { userEmail: "sanaz@example.com", message: "Great class", rating: 5 },
      { userEmail: "solmaz@example.com", message: "Nice trainer", rating: 4 },
    ]);

    // Equipment
    await db.collection("equipment").insertMany([
      { name: "treadmill", condition: "good", lastMaintenance: new Date() },
      {
        name: "bench prss",
        condition: "needs repair",
        lastMaintenance: new Date(),
      },
    ]);

    console.log("MONGO DB SEEDED SUCCESSFULLY");
  } catch (error) {
    console.error("FAILED TO SEED MONGO", error);
  } finally {
    await client.close();
  }
}

seedMongo();
