const User = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/user/register', User.register);
    app.post('/api/user/login', User.login);

    app.get('/api/user/organization/all/:id', User.getAllUsersInOrg);
    app.post('/api/user', User.getUserById);
}