const express = require('express');
const app = express();
const mongoDb = require('./config/database')
mongoDb();
const mentor = require('./routes/mentor');
const student = require('./routes/student');


app.use(express.json());

app.use('/mentor',mentor);
app.use('/student',student);


app.get('/',(req, res) => {
    res.send('Welcome to home route')
})

app.listen(5000,()=>{
    console.log('server started successfully');
})