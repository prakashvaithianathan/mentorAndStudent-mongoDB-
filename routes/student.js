const express = require('express').Router();
const mentorModel = require('../models/mentor');
const studentModel = require('../models/student');

//this is student route
express.get('/',(req, res) => {
    res.send('welcome to student route')
})

//this route is used to add student 
express.post('/add',async(req, res) =>{
    try {
        const add = await studentModel.create(req.body);
        res.json(add)
    } catch (error) {
        res.json({message: error.message})
    }
})

//this route is used to find student data
express.post('/find/:id',async(req, res) =>{
    try {
        const find = await studentModel.find({_id:req.params,id});
        res.json(find);
    } catch (error) {
        res.json({message: error.message})
    }
})

//this route is used to update student data
express.put('/update/:id',async(req,res)=>{
    try {
        const update = await studentModel.findOneAndUpdate(
            {_id:req.params.id},
            {name:req.body.name},
            {new:true}
        )
        res.json(update)
    } catch (error) {
        res.json({message: error.message})
    }
})

//this route is used to delete student data
express.delete('/delete/:id',async(req, res)=>{
    try {
        const del = await studentModel.findOneAndDelete({_id:req.params.id});
        res.json(del)
    } catch (error) {
        res.json({message: error.message})
    }
})

//this method is used to create student and set studentList for a particular mentor
express.post('/add/mentor/:id',async(req, res)=>{
    try {
        // const session = await studentModel.startSession();
        // const stu = new studentModel(req.body);
        // const studentDetails = await stu.save({session:session});
        //  const mentorDetails = await mentorModel.findOneAndUpdate(
        //      {name:req.params.name},
        //      {
        //          $push:{studentList:studentDetails}
        //      },
        //      {new:true}
        //  ).session(session)
        // res.json({student:studentDetails,mentor:mentorDetails})


        const session = await studentModel.startSession();
        const stu =  new studentModel(req.body);
        const studentDetails = await stu.save({session:session});
           const mentorDetails = await mentorModel.findOneAndUpdate(
               {_id:req.params.id},
               {
                   $push:{studentList:studentDetails}
               },
               {new:true}
           ).session(session)
           res.json({student:studentDetails,mentor:mentorDetails})







    } catch (error) {
        res.json({message: error.message})
    }
}) 
module.exports = express;