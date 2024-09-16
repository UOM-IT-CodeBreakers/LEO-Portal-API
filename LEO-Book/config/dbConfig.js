const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.MongoDB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB connected successfully");
    }catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;