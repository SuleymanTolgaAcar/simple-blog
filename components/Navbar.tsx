import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom mb-2">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-3">
            <li className="nav-item">
              <Link
                className="btn btn-outline-dark"
                aria-current="page"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn btn-outline-dark"
                aria-current="page"
                href="/post/create"
              >
                Create Post
              </Link>
            </li>
          </ul>
          {!session && (
            <button className="btn btn-outline-dark" onClick={() => signIn()}>
              Sign in
            </button>
          )}
          {session && (
            <button className="btn btn-outline-dark" onClick={() => signOut()}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
