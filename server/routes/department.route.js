const Department = require('../controllers/department.controller');

module.exports = app => {
    app.post("/api/department/create", Department.createDept);
}