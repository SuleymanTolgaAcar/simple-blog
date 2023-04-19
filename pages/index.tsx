import { GetServerSideProps } from "next";
import Post from "../components/Post";
import clientPromise from "@/lib/mongodb";
import { PostInterface } from "@/types/app";

export default function Home({ posts }: { posts: PostInterface[] }) {
  return (
    <div className="container">
      <div className="row justify-content-center">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4 d-inline-block mb-3">
            <Post key={post._id.toString()} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps<GetServerSideProps>() {
  const client = await clientPromise;
  const db = client.db();

  const posts = await db
    .collection("posts")
    .find({})
    .sort({ date: -1 })
    .toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
