import mongoose from 'mongoose';
import User from '@/models/user';  // Ensure User model is imported
import Prompt from '@/models/prompt';  // Ensure Prompt model is imported

let isConnected = false; 

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt",
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log("database.ts:", error);
  }
}