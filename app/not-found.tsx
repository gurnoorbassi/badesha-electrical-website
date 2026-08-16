import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: false } };

export default function NotFound() {
  return <main className="page-intro"><p className="kicker">404, page not found</p><h1>That circuit ends here.</h1><div className="page-intro-copy"><p>The page you were looking for has moved or no longer exists.</p><Link className="button dark" href="/">Return home</Link></div></main>;
}
