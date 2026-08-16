import Link from "next/link";

export default function NotFound() {
  return <main className="page-intro"><p className="kicker">404 · Page not found</p><h1>That circuit ends here.</h1><div className="page-intro-copy"><p>The page you were looking for has moved or no longer exists.</p><Link className="button dark" href="/">Return home</Link></div></main>;
}
