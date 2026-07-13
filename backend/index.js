const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const nodemailer = require("nodemailer");


const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://akashnoyal12:8FCBxzShcny1XTuE@cluster0.6jhwmtr.mongodb.net/passkey")
    .then(function () {
        console.log("connected")
    }).catch(function () {
        console.log("not connected")
    })


const credential = mongoose.model("credential", {}, "bulkmail")

let transporter;

credential.find()
    .then(function (data) {

        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
            },
        });

        console.log("Transporter created");
    })
    .catch(function (error) {
        console.log(error);
    });




app.post("/sendemail", async function (req, res) {

    const sub = req.body.sub;
    const msg = req.body.msg;
    const emailList = req.body.emailList;

    try {

        for (let i = 0; i < emailList.length; i++) {

            await transporter.sendMail({
                from: "akashnoyal.dev@gmail.com",
                to: emailList[i],
                subject: sub,
                text: msg,
            });

            console.log("Email sent to:", emailList[i]);
        }

        res.send(true);

    } catch (error) {

        console.log(error);
        res.send(false);
    }
});



app.listen(5005, function () {
    console.log("Server Started.....")
})