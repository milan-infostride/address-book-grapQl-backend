const { buildSchema }  = require('graphql');

module.exports = buildSchema(`
    
    type User {
        fullName: String,
        email: String
    }



    input userSignUpInputData {
        fullName: String,
        email: String,
        password: String
    }


    type rootQuery {
        welcome : String
    }


    type rootMutation {
        signUpUser(userSignUpData: userSignUpInputData) : User
    }

    schema {
        query: rootQuery,
        mutation: rootMutation
    }
`)