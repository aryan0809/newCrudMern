const { name } = require('ejs');
const mongoose = require('mongoose');
// const { string, number } = require('zod');

const schema = mongoose.Schema;

const userSchema= schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    age:{
        type:Number
    },
    profilePic:{
        type:String
    }
});

const User= mongoose.model('User', userSchema);
module.exports= User;