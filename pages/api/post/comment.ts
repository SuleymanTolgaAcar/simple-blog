import clientPromise from "@/lib/mongodb";
import { CommentInterface } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const comment: CommentInterface = { ...req.body, _id: new ObjectId() };
    db.collection("posts").updateOne(
      { _id: new ObjectId(comment.postId) },
      {
        $push: { comments: comment },
      }
    );
    res.status(200).json({ message: "Comment created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
