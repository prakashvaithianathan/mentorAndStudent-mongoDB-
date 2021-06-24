const mongoose = require('mongoose');

const student = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:Number,
    contact:Number,
    sports:[
        new mongoose.Schema({
            name:String,
            coach:String
        })
    ]
},
{
    timestamps:true
})
const studentRoute = mongoose.model("students",student);

module.exports = studentRoute;