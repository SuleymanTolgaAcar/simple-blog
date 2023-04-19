import clientPromise from "@/lib/mongodb";
import { PostInterface } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const post: PostInterface = req.body;
    db.collection("posts").insertOne(post);
    res.status(200).json({ message: "Post created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
