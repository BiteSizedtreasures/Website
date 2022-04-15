require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

async function mainMail(name, email, subject, message) {
    // Create reusable transporter object using the default SMTP transport
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        }
    });

    const mailOption = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: subject,
        html: `You got a message from 
        Email: ${email}
        Name: ${name}, 
        Message: ${message}`,
    };
    
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            res.json({ success: false, message:"Could not send message." });
        } else {
            res.json({ success: true, message:"Message Sent." });
        }
    });
}

router.post("/send", async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email; 
    const subject = req.body.subject; 
    const message = req.body.message;
    try {
        mainMail(name, email, subject, message);
        res.json({ success: true, message:"Email Sent." });
    } catch (err) {
        res.json({ success: false, message:"Error Sending Email: " + err }); 
    }
});

module.exports = router;