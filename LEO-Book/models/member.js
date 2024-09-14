const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    mobile:{
        type:String,
        required: false
    },
    faculty:{
        type: String,
        required: true
    },
    batch:{
        type:Number,
        required: true
    },
    distict:{
        type:String,
        require:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    addedDate:{
        type:Date,
        require:true
    },
    addedBy:{
        type:String,
        require:true
    },
    ratings:{
        type:Number,
        require:false
    }
});

const Member = mongoose.model("member", memberSchema);

module.exports = Member;