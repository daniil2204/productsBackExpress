import { MongoClient } from "mongodb";
import { DBName, ProductType } from "../types";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGOURL || "test";

export const client = new MongoClient(mongoURL);
console.log(process.env.DBName);
const db = client.db(
  process.env.DBName === "samyraiBack" ? "samyraiBack" : "samyraiBackTests"
);

export const productCollection = db.collection<ProductType>("products");

export const runDB = async (DB: DBName) => {
  try {
    await client.connect();
    await client.db(DB).command({ ping: 1 });
    console.log("Connect was succesfully!");
  } catch {
    console.log("Connect was not succesfully");
    await client.close();
  }
};
