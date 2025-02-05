import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
    return;
  }

  try {
    await mongoose.connect(url!, {
      bufferCommands: false,
    });
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default dbConnect;
