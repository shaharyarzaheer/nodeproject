const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required :true
    },
    password:{
        type: String,
        required: true
    }
})
UserSchema.pre('save', async function (next){
    try{
        console.log("password : " ,this.password)
        const salt = await bcrypt.genSalt(10);
        console.log("Salt is :", salt)
        const hash  = await bcrypt.hash(this.password, salt)
        console.log("hash is : ", hash)
        this.password = hash
        next();
    }
    catch{

    }
})

module.exports = User = mongoose.model("User", UserSchema);