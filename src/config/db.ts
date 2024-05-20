import mongoose from "mongoose";

export const connect = async () => {
 try {
  if (process.env.MONGO_URI) {
   const connection = await mongoose.connect(process.env.MONGO_URI);
   console.log(`Connected to the db:${connection.connection.host}`);
  }
 } catch (error) {
  console.log(`Error:${error}`);
  process.exit(1);
 }
};
