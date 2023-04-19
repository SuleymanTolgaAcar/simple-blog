import router from "next/router";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  if (!session) return <h1 className="text-center">Not logged in</h1>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !content) return alert("Please fill in all fields");

    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: session.user!.name,
        title,
        content,
        date: new Date(),
        comments: [],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    router.push("/");
  };

  return (
    <div className="container d-flex flex-column w-50 mt-5">
      <h1 className="text-center">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mt-1">
          <label htmlFor="content">Content</label>
          <textarea
            className="form-control"
            id="content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
