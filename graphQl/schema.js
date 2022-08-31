const { buildSchema }  = require('graphql');
const addressInput = require('./schemas/input-schemas/addressInput');
const deleteAddressInput = require('./schemas/input-schemas/deleteAddressInput');
const editAddressInput = require('./schemas/input-schemas/editAddressInput');
const deleteAddressResponse = require('./schemas/type-schemas/deleteAddressResponse');

module.exports = buildSchema(`

    type loginData {
        statusCode: Int,
        user: User,
        token: String
    }

    
    type User {
        fullName: String,
        email: String,
        _id: String
    }

    type signUpReturn {
        statusCode: Int,
        user: User
    }

    type Address {
        name: String,
        building_location: String,
        city: String,
        state: String,
        date: String,
        uid: String,
        _id: String
    }


    type addresses {
        addresses: [Address]
    }

    input userSignUpInputData {
        fullName: String,
        email: String,
        password: String
    }

     
    input userLoginInputData {
        email: String,
        password: String
    }

    ${addressInput}

    ${editAddressInput}

    ${deleteAddressInput}

    ${deleteAddressResponse}

    type rootQuery {
        welcome : String
        getAddresses: addresses
    }


    type rootMutation {
        signUpUser(userSignUpData: userSignUpInputData) : signUpReturn,
        loginUser(loginData:userLoginInputData) : loginData,
        addAddress(addAddressData: addressInput) : Address,
        editAddress(editAddressData: editAddressInput): Address,
        deleteAdddress(deleteAddressData: deleteAddressInput): deleteAddressResponse

    }

    schema {
        query: rootQuery,
        mutation: rootMutation
    }
`)