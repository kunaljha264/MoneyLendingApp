const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SALT} = require('../config/serverConfig');


const userSchema = new mongoose.Schema({
    phone:{
        type:String,
        required : true,
        unique: [true, 'Phone number is already in use'],
    },
    email :{
        type : String,
        required : true,
        unique : [true, 'Email id is already in use'],
        lowercase : true,
    },
    name : {
        type : String,
        required : true,
    },
    registrationDate : {
        type : Date,
        default : Date.now
    },
    dob : {
        type : Date,
        required : true,
    },
    monthlySalary : {
        type : Number,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
    },
    status : {
        type : String,
        enum : ['Pending', 'Approved'], 
        default : 'Pending'
    },
    purchasePower:{
        type : Number,
    }

}, {timestamps:true});

// To store the hashedPassword, used pre hook
userSchema.pre("save", async function(next){
    this.password = await bcrypt.hashSync(this.password,SALT);
    next();
})

// 
userSchema.methods.comparePassword = async function(incomingPassword){
    return await bcrypt.compareSync(incomingPassword, this.password);
}

const user = mongoose.model('User', userSchema);

module.exports = user;