const nodemailer = require("nodemailer");

// transporter (unchanged core, just added verify)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// optional but very useful debug
transporter.verify((err, success) => {
  if (err) {
    console.error("Email config error:", err.message);
  } else {
    console.log("Email server ready");
  }
});

async function sendWelcomeEmail(userEmail, userName) {
  // ✅ basic validation (added)
  if (!userEmail || !userName) {
    console.error("Invalid email data");
    return false;
  }

  const mailOptions = {
    from: `"AsiTech" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Welcome to AsiTech — We're Excited to Connect!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2e80d8, #5ab4f0); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: linear-gradient(135deg, #2e80d8, #5ab4f0); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">Welcome to AsiTech!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${userName}</strong>,</p>
              <p>Thank you for reaching out to us! We've received your message and our team is excited to connect with you.</p>
              <p>Here's what happens next:</p>
              <ul>
                <li>📧 Our team will review your inquiry</li>
                <li>⏰ You'll receive a detailed response within 24 hours</li>
                <li>🤝 We'll schedule a call if you'd like to discuss further</li>
              </ul>
              <p>In the meantime, feel free to explore our services and learn more about how we help businesses transform digitally.</p>
              <a href="http://localhost:5000" class="button">Visit Our Website</a>
            </div>
            <div class="footer">
              <p>AsiTech — Empowering Digital Innovation</p>
              <p>Lalitpur, Nepal | hello@asitech.io</p>
              <p>© 2026 AsiTech. All Rights Reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${userName},

Thank you for reaching out to us! We've received your message and our team is excited to connect with you.

Here's what happens next:
- Our team will review your inquiry
- You'll receive a detailed response within 24 hours
- We'll schedule a call if you'd like to discuss further

In the meantime, feel free to explore our services at http://localhost:5000

Best regards,
The AsiTech Team
    `,
  };

  try {
    // ✅ still await (keeping your core logic)
    await transporter.sendMail(mailOptions);

    console.log(`Welcome email sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error(
      `Failed to send welcome email to ${userEmail}:`,
      error.message,
    );
    return false;
  }
}

module.exports = { sendWelcomeEmail };
