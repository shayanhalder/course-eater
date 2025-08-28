import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri: string | undefined = process.env.DB_URI;

export const connectDB = async () => {
  let client;
  // try {
    if (!uri) {
      throw new Error("DB_URI is not defined");
    }
    client = new MongoClient(uri);
  // } catch (err) {
    // console.log("Error: could not make connection.");
    // client = null
    // throw new Error("DB_URI is not defined");
  // }
  return client;
};

// module.exports = connectDB;
