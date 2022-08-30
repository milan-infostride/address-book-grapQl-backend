const User = require('../models/User');
const bcrypt = require('bcrypt');
const userController = {
    async signUpUser({userSignUpData},res){
        console.log("We are here")
       let founduser = await User.findOne({email: userSignUpData.email})
       if(founduser){
        let error = new Error();
        error.message = 'user already exist',
        error.statusCode = 500;
        throw error;
       }
       let hashedUser = {...userSignUpData};
       let hashedPassword = await bcrypt.hash(hashedUser.password,12);
       if(!hashedPassword){
           let error = new Error();
           error.message = 'Bcrypt Error';
           error.statusCode = 500;
           throw error;
       }
       hashedUser.password = hashedPassword;
       let newUser = new User(hashedUser);
       let savedUser = await newUser.save();
       if(!savedUser){
           let error = new Error();
           error.message = 'Can\'t sign up user';
           error.statusCode = 500;
           throw error;
       }
       let { fullName , email } = savedUser;
       return {
           fullName,
           email
       }

   }
}

module.exports = userController;