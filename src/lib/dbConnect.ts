import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;  // Store the connection state as a number (1 = connected, 0 = disconnected)
};

const connection: ConnectionObject = {};

export const dbConnect = async () => {
  // If already connected, return the existing connection
  if (connection.isConnected === 1) {
    console.log("Already connected to the database");
    return mongoose.connection;  // Return the existing connection
  }

  try {
    // Connect to the MongoDB database (only if not already connected)
    const db = await mongoose.connect(process.env.MONGODB_URI || '');

    // Store the connection state as an integer value (1 = connected)
    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");

    return mongoose.connection;  // Return the connection object
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed. Please try again later.");
  }
};
