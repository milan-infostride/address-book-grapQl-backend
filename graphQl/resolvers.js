const defaultQueryController = require('../controllers/defaultQueryController');
const userController = require('../controllers/userController');
const resolvers = {
    ...defaultQueryController,
    ...userController
};


module.exports = resolvers;