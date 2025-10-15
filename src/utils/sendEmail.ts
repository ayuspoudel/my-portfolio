import emailjs from "@emailjs/browser"

interface EmailPayload {
  from_name: string
  from_email: string
  message: string
}

export async function sendEmail(payload: EmailPayload) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  // --- Prevent runtime issues if env vars are missing ---
  if (!serviceId || !templateId || !publicKey) {
    return {
      success: false,
      message: "Email service not configured. Please try again later.",
    }
  }

  try {
    await emailjs.send(serviceId, templateId, payload, publicKey)
    return {
      success: true,
      message: "Message sent successfully!",
    }
  } catch {
    // no console.log or console.error in production
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
