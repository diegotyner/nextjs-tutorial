import mongoose from 'mongoose';

let isConnected = false; 

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "share_prompt",
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log("database.ts:", error);
  }
}