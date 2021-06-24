const mongoose = require('mongoose');

const mentor = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:Number,
    contact:Number,
    experience:{
            type: Number,
            default:0
    },
    studentList:[]
},
{
    timestamps:true
})
const mentorRoute = mongoose.model("mentors",mentor);

module.exports = mentorRoute;