const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const memberRouter = require("./routes/members.js");
const loginRouter = require("./routes/auth.js")
const connectDB = require('./config/dbConfig.js');
const app = express();

connectDB();

const PORT = process.env.PORT || 8080

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.use("/member", memberRouter);
app.use("/member", loginRouter);

app.listen(PORT, () => {
    console.log(`Server is running on:${PORT}`)
})