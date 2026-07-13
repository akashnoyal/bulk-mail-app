require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const Mail = require("./models/Mail");
const Admin = require("./models/Admin");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.get("/", (req, res) => {
    res.send("Server is running...");
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({
            email,
            password,
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        res.json({
            success: true,
            message: "Login successful",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


app.post("/sendemail", async (req, res) => {
    try {

        const { sub, msg, emailList } = req.body;

        for (const email of emailList) {

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: sub,
                text: msg
            });

            console.log("Email sent to:", email);
        }

        await Mail.create({
            subject: sub,
            body: msg,
            recipients: emailList,
            status: "Success"
        });

        res.json({
            success: true,
            message: "Emails sent successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to send emails"
        });
    }
});



app.get("/history", async (req, res) => {
    try {

        const history = await Mail.find().sort({
            createdAt: -1
        });

        res.json(history);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching history"
        });
    }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});