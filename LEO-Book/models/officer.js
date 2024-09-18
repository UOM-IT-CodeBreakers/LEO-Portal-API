const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officerSchema = new Schema({
    name:{
        type: String,
        required: false,
    },
    designation:{
        type: String,
        required: true,
    },
    mobile:{
        type:String,
        required: false
    },
    faculty:{
        type: String,
        required: false,
    },
    batch:{
        type:Number,
        required: false
    },
    department:{
        type: String,
        required: false,
    },
    district:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false,
    },
    birthday:{
        type:Date,
        required:false,
    },
    projectIdeas:{
        type:[String],
        required:false,

    },
    examDays:{
        type:[Date],
        required:false,
    },
    attributes:{
        type:[String],
        required:false,

    },
    projects:{
        type:[Schema.Types.Mixed],
        required:false,
    },
    notes:{
        type:[String],
        required:false,
    }
});

const Officer = mongoose.model("officer", officerSchema);

module.exports = Officer;