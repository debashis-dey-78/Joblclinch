import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // Create a transporter using standard SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: process.env.SMTP_PORT || 2525,
    auth: {
      user: process.env.SMTP_USER || "your_mailtrap_user",
      pass: process.env.SMTP_PASS || "your_mailtrap_password",
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME || "JobClinch"} <${process.env.SMTP_FROM_EMAIL || "noreply@jobclinch.com"}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.htmlMessage || `<p>${options.message}</p>`,
  };

  await transporter.sendMail(message);
};
