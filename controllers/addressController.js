const Address = require('../models/Address');
const addressesController = {
    async getAddresses(args,req){
        if(req.error){
            throw req.error;
        }
        if(!req.user_id){
            const error = new Error();
            error.message = 'authentication error';
            error.statusCode = 403;
            throw error;
        }
        let addresses = await Address.find({uid: req.user_id || "630f6e85a666231439b610b1"},{__v:0});
        // if(addresses && addresses.length==0)
        addresses = addresses.map(address=>{
            address._id = address._id.toString();
            // delete address._id
            address.uid = address.uid.toString();
            return address;
        })
        return {
            addresses
        }
    },
    async addAddress({addAddressData},req){
        if(req.error){
            throw req.error;
        }
        if(!req.user_id){
            const error = new Error();
            error.message = 'authentication error';
            error.statusCode = 403;
            throw error;
        }
        let createdAddress = {
            ...addAddressData,
            uid: req.user_id || "630f6e85a666231439b610b1"
        }
        let newAddress = new Address(createdAddress);
        let savedAddress = await newAddress.save();
        if(!savedAddress){
            const error = new Error();
            error.message = 'some error occured';
            error.statusCode = 500
            throw error;
        }
        return {
            ...savedAddress._doc,
            _id: savedAddress._id.toString(),
            uid: savedAddress.uid.toString()
        }
    },
    async editAddress({editAddressData},req){
        if(req.error){
            throw req.error;
        }
        if(!req.user_id){
            const error = new Error();
            error.message = 'authentication error';
            error.statusCode = 403;
            throw error;
        }
        const currentAddress = await Address.findById(editAddressData.address_id);
        for(let prop in editAddressData.newAddress){
            currentAddress[prop] = editAddressData.newAddress[prop]
        }
        let savedAddress = await currentAddress.save()
        if(!savedAddress){
            const error = new Error();
            error.message = 'some error occured';
            error.statusCode = 500
            throw error;
        }
        return {
            ...savedAddress._doc,
            _id: savedAddress._id.toString(),
            uid: savedAddress.uid.toString()
        }
    },
    async deleteAdddress({deleteAddressData},req){
        if(req.error){
            throw req.error;
        }
        if(!req.user_id){
            const error = new Error();
            error.message = 'authentication error';
            error.statusCode = 403;
            throw error;
        }
        const foundAddress = await Address.findByIdAndDelete(deleteAddressData.address_id)
        if(!foundAddress){
            const error = new Error()
            error.message = 'delete error'
        }
        return {
            statusCode: 201,
            message: 'deleted'
        }
    }
}

module.exports = addressesController