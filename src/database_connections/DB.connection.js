import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const dbConnection = async () => {
  try {
    const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_name}`);
    console.log(`\n mongodb is connected !! DB host: ${connectionInstances.connection.host}`);
  } catch (error) {
    console.log("database is not connected due to this error:", error);
    process.exit(1);
  }
};

export default dbConnection;
