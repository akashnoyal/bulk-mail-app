const Mail = require("../models/Mail");

const sendMail = async (req, res) => {
    try {
        const { subject, message, recipients } = req.body;

        const newMail = new Mail({
            subject,
            message,
            recipients,
        });

        await newMail.save();

        res.status(201).json({
            success: true,
            message: "Mail data saved successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { sendMail };