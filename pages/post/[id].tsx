import clientPromise from "@/lib/mongodb";
import { CommentInterface, PostInterface } from "@/types/app";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

export default function PostDetails({ post }: { post: PostInterface }) {
  const router = useRouter();
  const date = new Date(post.date);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session) return alert("You must be logged in to comment");

    const res = await fetch("/api/post/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: post._id,
        author: session.user!.name,
        content: comment,
        date: new Date(),
      }),
    });

    if (!res.ok) return alert("Something went wrong");
    setComment("");
    router.push(`/post/${post._id}`);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="text-center border-bottom fs-1 w-100 p-2">{post.title}</h1>
      <p className="fs-6 me-auto">{post.content}</p>
      <div className="d-flex w-100 ms-auto justify-content-end">
        <button
          className="btn btn-outline-dark me-auto h-50"
          onClick={() => {
            fetch(`/api/post/${post._id}`, {
              method: "DELETE",
            });
          }}
          disabled={!(session && session.user!.name == post.author)}
        >
          Delete Post
        </button>
        <div className="d-flex flex-column">
          <p className="text-end text-muted fs-6 fw-light mb-0 ms-auto">
            {post.author}
          </p>
          <p className="text-end text-muted fs-6 fw-light ms-auto">
            {date.toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {date.toLocaleTimeString("tr-TR", {
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
      </div>
      {post.comments.length > 0 && (
        <>
          <h2 className="text-center border-bottom fs-2 w-100 p-2">Comments</h2>
          <div className="w-100 d-flex flex-column align-items-center p-4 gap-2">
            {post.comments.map((comment: CommentInterface) => (
              <div
                key={comment._id.toString()}
                className="card col-12 col-md-6"
              >
                <div className="card-header d-flex">
                  <h6 className="mb-0">{comment.author}</h6>
                  <p className="ms-auto mb-0 text-muted">
                    {date.toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    {date.toLocaleTimeString("tr-TR", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <div className="card-body">
                  <p className="mb-0">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <h2 className="text-center border-bottom fs-2 w-100 p-2">Add Comment</h2>
      <form onSubmit={handleSubmit} className="col-12 col-md-6">
        <div className="form-group mt-3">
          <textarea
            className="form-control"
            id="comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 mt-2 mb-5">
          Submit
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = client.db();
  if (!context.params!.id || typeof context.params!.id !== "string") {
    return {
      notFound: true,
    };
  }
  const post = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(context.params!.id) });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
