const jwt = require('jsonwebtoken')
const User = require('../models/User')
const userAuth = (req,res,next)=>{
    let decodedToken = null;
    let token = null
    try {
        if(req.get('Authorization')){
            token = req.get('Authorization').split(' ')[1];
            decodedToken = jwt.verify(token,'meraSecret')
        }
        else{
            const error = new Error();
            error.message = 'no authorization token send'
            throw error;
        }
        if(!decodedToken){
            console.log('invalid token')
            const error = new Error('invalid Token');
            error.statusCode = 500;
            throw error;
        }
        else{
            req.user_id = decodedToken.user_id;
            req.user_email = decodedToken.user_email;
            next();
        }
        
    }
    catch(err){
        //err.statusCode(500);
        // errorHandlingFunction(err,res);
        req.error = err;
        next()
    }
   
}


module.exports = userAuth