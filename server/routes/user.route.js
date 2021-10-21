const User = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/user/register', User.register);
    app.post('/api/user/login', User.login);

    app.get('/api/user/organization/all', User.getAllUsersInOrg);
    app.get('/api/user/getbyid', User.getUserById);
}