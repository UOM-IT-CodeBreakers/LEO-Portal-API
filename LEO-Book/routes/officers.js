const express = require('express');
const router = express.Router();

let Officer = require("../models/officer");

//set designation route
router.route("/add-designation").post(async(req,res) => {
    const { designation } = req.body;

    if(!designation || !Array.isArray(designation)){
        return res.status(400).json({ error:"Invalid or missing designation array"});
    }
    try{
        const officersToInsert = designation.map(designation => ({
            name: null,
            designation: designation,
            mobile: null,
            faculty: null,
            department: null,
            batch: null,
            district:null,
            email:null,
            birthday:null,
        }));
        await Officer.insertMany(officersToInsert);

        res.json({ message: "Designations added successfully!"});
    }catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
});

//Add officers route
router.route("/add-officer").post(async(req,res) => {
    const{ name, designation, mobile, faculty, department, batch, district,email, birthday} = req.body;

    const newOfficer = new Officer({
        name,
        designation,
        mobile,
        faculty,
        department,
        batch,
        district,
        email,
        birthday
    });
    await newOfficer.save().then(() => {
        res.json("officer added successfully!");
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ error:err.message })
    });
});

//Directors assign to the designation route
router.route("/add-director").put(async(req,res) => {
    const { designation } = req.body;
    const { name, mobile, faculty, department, batch, district, email, birthday} = req.body;

    try{
    const updatedOfficer = await Officer.findOneAndUpdate(
        { designation },
        {
            name,
            mobile,
            faculty,
            department,
            batch,
            district,
            email,
            birthday
        },
        { new: true }
    );
    if (!updatedOfficer) {
        return res.status(404).json({ msg: "Officer with the given designation not found" });
    }

    res.json({ message: "Officer updated successfully!", updatedOfficer });
} catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
}
});

module.exports = router;