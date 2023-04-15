// Import the MongoClient from the MongoDB driver
import { MongoClient } from 'mongodb';

// Define the MongoDB connection URI and database name
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

// Define the API route handler
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Get the email to be searched from the request body
    const { email } = req.body;

    // Validate the email parameter
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Create a new MongoClient instance
      const client = new MongoClient(uri, { useUnifiedTopology: true });

      // Connect to MongoDB
      await client.connect();

      // Get the database and collection
      const db = client.db(dbName);
      const collection = db.collection(process.env.MONGO_COLLECTION);

      // Search for objects containing the specified email in either the "email" or "owner2" field
      const query = {
        $or: [
          { email: email },
          { owner2: email }
          // Add more fields here if needed
        ]
      };
      const result = await collection.find(query).toArray();

      // Close the MongoDB connection
      await client.close();

      // Check if any objects were found
      if (result.length > 0) {
        // Send a success response with the matching objects
        res.status(200).json({ message: 'Objects found', objects: result });
      } else {
        // Send a response indicating no objects were found
        res.status(404).json({ message: 'No objects found with the specified email' });
      }
    } catch (error) {
      // Send an error response
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  } else {
    // Send a response for unsupported methods
    res.status(405).json({ message: 'Method not allowed' });
  }
}
