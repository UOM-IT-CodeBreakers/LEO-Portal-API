const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Member = require('../models/member');
require('dotenv').config();
const router = express.Router();

router.post('/login', async (req, res) => {
    const {  email, password } = req.body;

    try{
        let member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({ msg:"Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, member.password);
        if(!isMatch){
            return res.status(400).json({ msg: "Invalid email or password" });
        }
        const token = jwt.sign(
            { memberId: member._id },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } 
          );
      
          res.json({ message: "Login successful", token });
        } catch (err) {
          console.error(err);
          res.status(500).send("Server error");
        }
      });

module.exports = router;