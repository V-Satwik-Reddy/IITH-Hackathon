const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Satwik:satwik30@iith-hackathon.hwnty.mongodb.net/"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    // Perform database operations here
    const database = client.db("your-database-name");
    const collection = database.collection("your-collection-name");

    // Example operation: find documents in the collection
    const documents = await collection.find({}).toArray();
    console.log(documents);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

connectToMongoDB();
