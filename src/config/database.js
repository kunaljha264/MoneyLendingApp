const mongoose = require('mongoose');

const connect = async()=>{
    mongoose.connect('mongodb://localhost/MoneylendingApp');
}

module.exports = connect;