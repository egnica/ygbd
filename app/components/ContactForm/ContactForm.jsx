"use client";

import { useRef, useState } from "react";
import styles from "./ContactForm.module.css";

const initialStatus = {
  type: "idle",
  message: "",
};

export default function ContactForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState(initialStatus);

  const isSending = status.type === "sending";
  const isSuccess = status.type === "success";

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const submission = {
      name: formData.get("name")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      location: formData.get("location")?.toString().trim() || "",
      description: formData.get("description")?.toString().trim() || "",
      website: formData.get("website")?.toString().trim() || "",
    };

    setStatus({
      type: "sending",
      message: "Sending your inquiry...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Your inquiry could not be sent. Please try again.",
        );
      }

      formRef.current?.reset();

      setStatus({
        type: "success",
        message: result.message || "Thank you. Your inquiry has been sent.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your inquiry could not be sent. Please try again.",
      });
    }
  }

  function handleReset() {
    formRef.current?.reset();
    setStatus(initialStatus);
  }

  return (
    <section className={styles.section} aria-labelledby="contact-form-heading">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.introduction}>
          <p className={styles.eyebrow}>Start a Conversation</p>

          <h2 className={styles.heading} id="contact-form-heading">
            Let’s talk about your garden.
          </h2>

          <p className={styles.description}>
            Tell us a little about your outdoor space, what you would like help
            with, and what you hope to create.
          </p>

          <div className={styles.details}>
            <p>
              Whether you are planning a complete transformation or need
              guidance refining an existing garden, we would love to hear about
              your project.
            </p>
          </div>
        </div>

        <div className={styles.formPanel}>
          {isSuccess ? (
            <div
              className={styles.successPanel}
              role="status"
              aria-live="polite"
            >
              <p className={styles.successEyebrow}>Inquiry Received</p>

              <h3 className={styles.successHeading}>
                Thank you for reaching out.
              </h3>

              <p className={styles.successMessage}>{status.message}</p>

              <button
                className={styles.secondaryButton}
                type="button"
                onClick={handleReset}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="contact-name">
                    Name
                    <span className={styles.required} aria-hidden="true">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    required
                    disabled={isSending}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email">
                    Email
                    <span className={styles.required} aria-hidden="true">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={isSending}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-phone">Phone</label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={50}
                    disabled={isSending}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-location">
                    City or Project Location
                  </label>

                  <input
                    id="contact-location"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    maxLength={150}
                    disabled={isSending}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-description">
                  Tell Us About Your Project
                  <span className={styles.required} aria-hidden="true">
                    *
                  </span>
                </label>

                <textarea
                  id="contact-description"
                  name="description"
                  rows={7}
                  maxLength={5000}
                  placeholder="Tell us about your outdoor space, what you would like help with, and any ideas or goals you have for the project."
                  required
                  disabled={isSending}
                />
              </div>

              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>

                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className={styles.formFooter}>
                <p className={styles.requiredNote}>
                  <span aria-hidden="true">*</span> Required fields
                </p>

                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Inquiry"}
                </button>
              </div>

              {status.type !== "idle" && (
                <p
                  className={
                    status.type === "error"
                      ? styles.errorMessage
                      : styles.statusMessage
                  }
                  role={status.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {status.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
