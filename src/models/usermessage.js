const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },

    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid EmailId")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    message:{
        type:String,
        required:true,
        minLength:3

    },
    date:{
        type:Date,
        default:Date.now
    }

})

//creating a collection
const User = mongoose.model("user",userSchema); //here "user" is the collecton name and it should be singular.

module.exports = User;
