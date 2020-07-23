const MongoServices = require('../Services/auth.services');
const userschema = require('../schema/auth.schema');
const bcrypt = require("bcryptjs");

module.exports.createUser = async (req, res) => {
    console.log("my date is", req.body.email)
    const validiation = userschema.SignUpSchema.validate(req.body);
    if(validiation.error){
        console.log(validiation.error);
        return res.status(400).json({
            message:validiation.error,
        });
    }
    try {
        const email = req.body.email
        console.log("email", email)
        const usercheck = await MongoServices.checkuser(email)
        if(usercheck){
            res.status(401).json({
                message:" User has been already registered"
            })
        }
        const newUser = new User(req.body);
        const user = await MongoServices.createUser(newUser)
        res.status(201).json({
            message: "Account is successfully created and email has been sent"
        })
        console.log("my data", user)

    }
    catch (error){
        res.json(error)
    }
    
}
module.exports.login = async (req, res) => {
    console.log("login data", req.body)
    const validiation = userschema.SignInSchema.validate(req.body);
    if(validiation.error){
        console.log(validiation.error);
        return res.status(400).json({
            message:validiation.error,
        });
    }
    try {
        const {email , password} = req.body
        const user = await MongoServices.checkuser(email)
        if(user){
            // compare password
            bcrypt.compare(password , user.password).then(isMatch => {
                if (isMatch){
                    res.status(201).json({
                        message: "successfully login!"
                    })
                }
                else{
                    res.status(401).json({
                        message: "Password is not correct"
                    })

                }
            })

        }
        else{
            res.status(404).json({
                message: "User is not exists"
            })
        }
        
    }
    catch (error){
    }
}