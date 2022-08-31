const addressesController = require('../controllers/addressController');
const defaultQueryController = require('../controllers/defaultQueryController');
const userController = require('../controllers/userController');
const resolvers = {
    ...defaultQueryController,
    ...userController,
    ...addressesController
};


module.exports = resolvers;