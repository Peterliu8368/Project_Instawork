const Organization = require('../controllers/organization.controller');

module.exports = app => {
    app.post("/api/organization/create", Organization.createOrg);
    app.post("/api/organization/addAdmin", Organization.addAdmin)
}