const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken')
const userController = {
    async signUpUser({userSignUpData},req){
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
       let { fullName , email , _id } = savedUser;

       return {
           statusCode: 201,
           user: {
                fullName,
                email,
                _id
           } 
       }

   },
   async loginUser({loginData},req){
        let foundUser = await User.findOne({email: loginData.email});
        if(!foundUser){
            let error = new Error();
            error.message = 'email not found...!!';
            error.statusCode = 404;
            throw error;
        }
        let isPasswordConfirmed = await bcrypt.compare(loginData.password,foundUser.password)
        if(!isPasswordConfirmed){
            let error = new Error();
            error.message = 'Invalid Password';
            error.statusCode = 401;
            throw error;
        }
        let { fullName, email , _id } = foundUser;
        const token = jwt.sign(
            {
              user_id: _id.toString(),
              user_email: email,
            },
            "meraSecret",
            { expiresIn: "10h" }
          )
        let user = {
            fullName,
            email,
            _id: _id.toString(),
        }
        return {
            statusCode : 200,
            user,
            token
        }
   }
}

module.exports = userController;