import Link from "next/link";

export default function Nav() {
  return (
    <nav className="navbar bg-light mb-2">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <Link className="link-unstyled" href="/">
            Recetario
          </Link>
        </span>
      </div>
    </nav>
  )
}