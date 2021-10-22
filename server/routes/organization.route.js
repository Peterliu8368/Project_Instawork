const Organization = require('../controllers/organization.controller');

module.exports = app => {
    app.post("/api/organization/create", Organization.createOrg);
    app.post("/api/organization/addAdmin", Organization.addAdmin);

    app.get('/api/organization/depts/:orgId', Organization.getAllDepts);
    app.get('/api/organization/:id', Organization.getById)
}