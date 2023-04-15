
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

// Define the API route handler
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Get the object to be inserted from the request body
    const objectToInsert = req.body;

    try {
      // Create a new MongoClient instance
      const client = new MongoClient(uri, { useUnifiedTopology: true });

      // Connect to MongoDB
      await client.connect();

      // Get the database and collection
      const db = client.db(dbName);
      const collection = db.collection(process.env.MONGO_COLLECTION);

      // Insert the object into the collection
      const result = await collection.insertOne(objectToInsert);

      // Close the MongoDB connection
      await client.close();

      // Send a success response
      res.status(200).json({ message: 'Object inserted successfully', insertedId: result.insertedId });
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  } else {
    // Send a response for unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}

