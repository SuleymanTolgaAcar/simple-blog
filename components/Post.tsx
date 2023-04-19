import { CommentInterface, PostInterface } from "@/types/app";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Post({ post }: { post: PostInterface }) {
  const router = useRouter();
  const date = new Date(post.date);

  return (
    <div className="card">
      <div className="card-header d-flex">
        <h2 className="">{post.title}</h2>
      </div>
      <div className="card-body">
        <p className="card-text fs-6">
          {post.content.slice(0, 200)}
          {post.content.length > 200 && "..."}
        </p>
      </div>
      <div className="card-footer text-muted d-flex">
        <button
          className="btn btn-outline-dark"
          onClick={() => {
            router.push(`/post/${post._id}`);
          }}
        >
          Read More...
        </button>
        <div className="ms-auto">
          <p className="card-subtitle fs-6 fw-lighter text-end">
            {post.author}
          </p>
          <p className="card-subtitle fs-6 fw-lighter text-end">
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
    </div>
  );
}
