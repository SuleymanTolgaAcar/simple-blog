import { MongoClient } from "mongodb";

const uri = process.env.DB_URL!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

let newGlobal = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.NODE_ENV === "development") {
  if (!newGlobal._mongoClientPromise) {
    client = new MongoClient(uri, options);
    newGlobal._mongoClientPromise = client.connect();
  }
  clientPromise = newGlobal._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
