const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const memberRouter = require("./routes/members.js");
dotenv.config();

const app = express();

// app.get('/', (req, res) => {
//     res.send('Server is running!');
//   });

app.use(bodyParse.json());
app.use(cors());

const URL = process.env.MongoDB_URL;

mongoose.connect(URL,{
  useNewUrlParser: true,
  useUnifiedTopology:true,
});

const connection = mongoose.connection;
connection.once("open",() => {
  console.log("MongoDB connection suceess!");
});

app.use("/member", memberRouter);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`)
})