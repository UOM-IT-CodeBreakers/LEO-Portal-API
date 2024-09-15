const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const memberRouter = require("./routes/members.js");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Server is running!');
//   });

app.use(bodyParser.json());
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

app.listen(PORT, () => {
    console.log(`Server is running on:${PORT}`)
})