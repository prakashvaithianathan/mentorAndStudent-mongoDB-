const mongoose = require('mongoose');

const url = "mongodb+srv://prakashVaithianathan:Indu07@praka18@cluster0.mruhe.mongodb.net/school-management?retryWrites=true&w=majority";

const mongoDb = async ()=>{
    try {
        const data = await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log(`MongoDB successfully connected in ${data.connection.host}`);
    } catch (error) {
        console.log('error in connect to database');
    }
}

module.exports = mongoDb