import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

// Database connection URL and name
const MONGO_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';
const DB_NAME = 'your-database-name';

let client: MongoClient;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, password } = req.body;

  // Validate input
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required.' });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ name });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await usersCollection.insertOne({
      name,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: 'Signup successful!', userId: result.insertedId });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
