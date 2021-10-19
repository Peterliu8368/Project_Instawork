const Organization = require('../controllers/organization.controller');

module.exports = app => {
    app.post("/api/organization/create", Organization.createOrg);
    app.post("/api/organization/department/add", Organization.addDepartment);
    app.delete("/api/organization/department/delete", Organization.deleteDepartment);
}