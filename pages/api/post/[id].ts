import clientPromise from "@/lib/mongodb";
import { PostInterface } from "@/types/app";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const {
      query: { id },
    } = req;
    if (!id || typeof id !== "string") {
      res.status(400).json({ message: "Missing post id" });
      return;
    }
    const post = await db
      .collection("posts")
      .findOne({ _id: new ObjectId(id) });
    if (req.method === "DELETE") {
      const result = await db
        .collection("posts")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Post deleted" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    } else if (req.method === "GET") {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
