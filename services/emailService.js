const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false // helps with self-signed certs
    },
    connectionTimeout: 10000 // 10 seconds
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP connection failed:", error);
    } else {
        console.log("✅ SMTP Server is ready:", success);
    }
});

/**
 * Send Email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body (HTML)
 */
const sendEmail = async (to, subject, html) => {
    try {
        let info = await transporter.sendMail({
            from: `"Website Contact" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        console.log("✅ Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("❌ Email sending failed:", error);
        return false;
    }
};

module.exports = { sendEmail };
