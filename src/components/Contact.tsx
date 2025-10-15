import React, { useState } from "react"
import { sendEmail } from "../utils/sendEmail"

export default function ContactMe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    try {
      const result = await sendEmail({
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      })
      setStatus(result.message)
      if (result.success) setForm({ name: "", email: "", message: "" })
    } catch {
      setStatus("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-heading">Contact Me</h2>
        <p className="contact-subtext">
          I’d love to hear about potential collaborations, backend roles, or
          interesting engineering projects. Fill out the form below and I’ll
          respond as soon as possible.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="input-group">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </label>

          <label className="input-group">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="input-group">
            <span>Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={5}
              required
            />
          </label>

          <button
            type="submit"
            className="contact-button"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p
            className={`contact-status ${
              status.toLowerCase().includes("success") ? "success" : "error"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </section>
  )
}
