const mongoose = require('mongoose');

const connectDB = async () => {
    try{
    const conn = await mongoose.connect("mongodb://172.16.6.213:27017/NewsUpdateData")

    console.log(`MongoDB Connected : ${conn.connection.host}`);
    }catch (error){
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;