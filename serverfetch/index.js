
const express = require('express');
const connectDB = require('./db.js');
const DataModel = require('./models/data.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get('/', async (req,res)=> {
    const response = await DataModel.find();
    return res.json({data :response});
})

app.listen(3000, ()=>{
    console.log("app is runnning at port : ",3000);
})