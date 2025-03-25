const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected');
    }catch(err){
        console.log('Database connection failed', err);
    }
}

module.exports = db;