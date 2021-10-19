const User = required('../controllers/user.controller');
const { authenticate } = require('../middleware/requireLogin');

module.exports = app => {
    app.post('/api/user/register', User.register);
    app.post('/api/user/login', User.login);

    app.get('/api/user/logout', User.logout);
    app.get('/api/user/isLoggedIn', authenticate, User.isLoggedIn);
}