/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("connecting.......");

    return;
  }

  try {
    mongoose.connect(url!, {
      dbName: process.env.MONGODB_DB,
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB", error);
  }
};

export default connect;
