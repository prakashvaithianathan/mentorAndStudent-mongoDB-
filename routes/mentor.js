const express = require('express').Router();
const mentorModel = require('../models/mentor');
const studentModel = require('../models/student');

express.get('/',(req, res) => {
    res.send('welcome to mentor route')
})


//this route is used to add mentor data
express.post('/add',async(req, res) =>{
    try {
        const add = await mentorModel.create(req.body);
        res.json(add)
    } catch (error) {
        res.json({message: error.message})
    }
})

//this route is used to find mentordata
express.post('/find/:id',async(req, res) =>{
    try {
        const find = await mentorModel.findOne({_id:req.params.id});
        
        res.json(find)
        
    } catch (error) {
        res.json({message: error.message})
    }
})

//this route is used to update mentor name
express.put('/update/:id',async(req, res)=>{
    try {
        const update = await mentorModel.findOneAndUpdate(
            {_id:req.params.id},
            {name:req.body.name},
            {new:true}
        )
        res.json(update)
        
    } catch (error) {
        res.json({message: error.message})
    }
})


//this route is used to delete route
express.delete('/delete/:id',async(req, res)=>{
    try {
        
    } catch (error) {
        res.json({message: error.message})
    }
})


//this route is used to assign students in given mentor
express.put('/update/student/:id', async(req, res)=>{
    try {
        const startSession = await mentorModel.startSession();
        const student = new studentModel(req.body);
        const studentDetails = await student.save({session:startSession});

        const pushStudent = await mentorModel.findOneAndUpdate(
            {_id:req.params.id},
            {
                $push:{studentList:studentDetails}
            },
            {new:true}
        ).session(startSession);
        res.json({mentor:pushStudent, student:studentDetails})

    } catch (error) {
        res.json({message: error.message})
    }
})

//this route is used to find all students from particular mentor
express.get('/find-student/:id',async(req, res)=>{
    try {
        const findAll = await mentorModel.find({_id:req.params.id});
        res.json(findAll[0].studentList)
    } catch (error) {
        res.json({message: error.message})
    }
})

module.exports = express;