const { sendEmail } = require("../services/emailService");
const contactModel = require('../models/Contact')
const courseModel = require('../models/Courses')
const contactRegister = async (req, res) => {
    try {
        const { full_name, email, phone, subject, message } = req.body;

        // ✅ Validation
        if (!full_name || !email || !phone || !subject || !message) {
            console.warn("⚠️ Missing required fields in contact form:", req.body);
            return res.status(400).send({
                code: 100,
                status: "FAILED",
                message: "Some fields are missing in the request body!"
            });
        }

        // 📩 Email to Admin
        const adminTemplate = `
            <h2>New Contact Request</h2>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;

        const adminEmailSent = await sendEmail(
            process.env.ADMIN_EMAIL,
            `Contact Form: ${subject}`,
            adminTemplate
        );

        if (!adminEmailSent) {
            console.error("❌ Failed to send email to Admin:", process.env.ADMIN_EMAIL);
            return res.status(500).send({
                code: 101,
                status: "FAILED",
                message: "Failed to notify admin via email"
            });
        }
        console.log(`✅ Email sent to Admin: ${process.env.ADMIN_EMAIL}`);

        // 📩 Auto-reply to User
        const userTemplate = `
            <h2>Hello ${full_name},</h2>
            <p>Thank you for reaching out to us.</p>
            <p>We have received your message and will get back to you soon.</p>
            <hr>
            <p><strong>Your Message:</strong></p>
            <p>${message}</p>
            <br>
            <p>Best Regards,<br/>Support Team</p>
        `;

        const userEmailSent = await sendEmail(
            email,
            "We have received your message",
            userTemplate
        );

        if (!userEmailSent) {
            console.error("❌ Failed to send auto-reply to User:", email);
            return res.status(500).send({
                code: 102,
                status: "FAILED",
                message: "Failed to send confirmation email to user"
            });
        }
        console.log(`✅ Auto-reply email sent to User: ${email}`);
        await contactModel.create({
            full_name, email, phone, subject, message
        })
        // ✅ Success Response
        return res.status(200).send({
            code: 200,
            status: "SUCCESS",
            message: "Successfully sent the details and email notifications!",
        });

    } catch (error) {
        console.error("🔥 Unexpected Error in contactRegister:", error.message, error.stack);
        return res.status(500).send({
            code: 500,
            status: "FAILED",
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const courseRegister = async (req, res) => {
    try {
        let reqBody = req.body;

        const newCourse = await courseModel.create({
            title: reqBody.title || null,
            description: reqBody.description || null,
            category: reqBody.category || null,
            price: reqBody.price || null,
            instructor: reqBody.instructor || null,
            duration: reqBody.duration || null
        });

        return res.status(201).send({
            code: 200,
            status: "SUCCESS",
            message: "Course registered successfully",
            data: newCourse
        });

    } catch (error) {
        console.error("🔥 Unexpected Error in courseRegister:", error.message, error.stack);
        return res.status(500).send({
            code: 500,
            status: "FAILED",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = { contactRegister, courseRegister };
