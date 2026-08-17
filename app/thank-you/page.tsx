import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project Request Received",
  description: "Your project request has been sent to Badesha Electrical.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <p className="kicker">Request received</p>
      <h1>Thank you.</h1>
      <p>Your project request has been sent to the Badesha Electrical projects team. For urgent electrical service, call <a href="tel:+16047806000">604-780-6000</a>.</p>
      <Link className="button dark" href="/">Return home</Link>
    </main>
  );
}
