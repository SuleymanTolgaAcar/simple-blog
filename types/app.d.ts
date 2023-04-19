import { ObjectId } from "mongodb";

export interface PostInterface {
  _id: ObjectId;
  author: string;
  date: Date;
  title: string;
  content: string;
  comments: CommentInterface[];
}

export interface CommentInterface {
  _id: ObjectId;
  postId: ObjectId;
  author: string;
  date: Date;
  content: string;
}
