"use client";

import { FormEvent, useState } from "react";

const encode = (formData: FormData) => new URLSearchParams(
  Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
).toString();

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });

      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="inquiry-section" aria-labelledby="inquiry-title">
      <div className="inquiry-intro">
        <p className="kicker light">Start a project</p>
        <h2 id="inquiry-title">Tell us what you need.</h2>
        <p>Share the essentials and the Badesha Electrical projects team will follow up directly.</p>
        <a href="mailto:projects@badeshaelectrical.com">projects@badeshaelectrical.com</a>
      </div>
      <form
        className="inquiry-form"
        name="project-inquiry"
        method="POST"
        action="/thank-you"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="project-inquiry" />
        <input type="hidden" name="subject" value="New Badesha Electrical website inquiry" data-remove-prefix />
        <p className="form-honeypot" aria-hidden="true">
          <label>Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
        </p>
        <div className="form-grid">
          <label>Full name<input name="name" type="text" autoComplete="name" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
          <label>Project location<input name="location" type="text" autoComplete="street-address" required /></label>
          <label>Service needed<select name="service" defaultValue="" required><option value="" disabled>Select a service</option><option>Residential electrical</option><option>Commercial electrical</option><option>Industrial electrical</option><option>Emergency service</option><option>EV charging</option><option>Generators and transfer switches</option><option>Other</option></select></label>
          <label>Preferred contact<select name="preferred-contact" defaultValue="Phone"><option>Phone</option><option>Email</option><option>Either</option></select></label>
        </div>
        <label>Project details<textarea name="message" rows={6} placeholder="Scope, timing and any important site details" required /></label>
        <label className="form-consent"><input name="consent" type="checkbox" value="yes" required /><span>I agree to be contacted about this request.</span></label>
        <div className="form-submit-row">
          <button className="button orange" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send project request"}</button>
          <p className="form-status" role="status" aria-live="polite">
            {status === "success" && "Thanks — your request has been received."}
            {status === "error" && <>Something went wrong. Please email <a href="mailto:projects@badeshaelectrical.com">projects@badeshaelectrical.com</a>.</>}
          </p>
        </div>
      </form>
    </section>
  );
}
