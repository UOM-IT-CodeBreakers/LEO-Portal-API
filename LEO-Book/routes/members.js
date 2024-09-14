const express = require("express");
const router = express.Router();

let Member = require("../models/member");

router.route("/add").post((req,res) => {
    const name = req.body.name;
    const mobile =req.body.mobile;
    const faculty = req.body.faculty;
    const batch = req.body.batch;
    const district = req.body.district;
    const email = req.body.email;
    const password = req.body.password;
    const addedDate = new Date();
    const addedBy = req.body.addedBy;
    const ratings = req.body.ratings;

    const newMember = new Member({
        name,
        mobile,
        faculty,
        batch,
        district,
        email,
        password,
        addedDate,
        addedBy,
        ratings
    });
    newMember.save().then(() => {
        res.json("Member added successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error:err.message})
    });

});

module.exports = router;