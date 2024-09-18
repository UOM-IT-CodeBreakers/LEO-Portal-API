const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

let Member = require("../models/member");
const { error } = require("console");

//member adding route
router.route("/add").post(async(req,res) => {
    const name = req.body.name;
    const mobile =req.body.mobile;
    const faculty = req.body.faculty;
    const batch = req.body.batch;
    const district = req.body.district;
    const email = req.body.email;
    const addedDate = new Date();
    const addedBy = req.body.addedBy;
    const ratings = req.body.ratings;
    const generatedPassword = crypto.randomBytes(6).toString("hex");

    try {
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newMember = new Member({
        name,
        mobile,
        faculty,
        batch,
        district,
        email,
        password: hashedPassword,
        addedDate,
        addedBy,
        ratings,
      });

    await newMember.save();

    await sendEmail(email, generatedPassword);

    res.json("Member added successfully, and email sent.");
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err.message });
  }
});

async function sendEmail( recerverEmail, generatedPassword) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from:process.env.EMAIL_USER,
        to: recerverEmail,
        subject: "Your Account Login Details",
        text:`Dear Member,

        Welcome to the UoM Leos! Here are login credentials:

        Email: ${recerverEmail}
        PassWord: ${generatedPassword}

        Please use these credentials to log in and make sure to change your password after logging in.

        Thank you!`
    };

    await transporter.sendMail(mailOptions);
}

//change password route
router.route("/change-password").post(async(req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try{
        const member = await Member.findOne({ email });
        if(!member) {
            return res,status(404).json({ msg: "Member not found" });
        }
        const isMatch = await bcrypt.compare(oldPassword, member.password);
        if(!isMatch) {
            return res.sendStatus(400).json({ msg: "Wrong Password! "});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        member.password = hashedPassword;
        await member.save();
        res.json("Password changed successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

//Route for search members by name
router.route("/search").get(async(req,res) => {
    const { Name } = req.query;
    try{
        const members = await Member.find({
            name: { $regex: new RegExp(Name, "i") },
        });
        if(members.length === 0) {
            return res.status(404).json({ message: "No members found." })
        }
        res.json(members);
    }catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;