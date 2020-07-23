const User = require('../models/auth.modeles');


const createUser = (newUser) => {
    return newUser.save()
}
const checkuser = (email) =>{
    return User.findOne({
        email
    })
}

const UserServices = {
    createUser,
    checkuser
}
module.exports = UserServices;