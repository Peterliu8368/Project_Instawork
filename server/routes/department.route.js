const Department = require('../controllers/department.controller');

module.exports = app => {
    app.post('/api/department/create', Department.createDept);
    app.put('/api/department/employee/add', Department.AddEmployeeToDept);
    app.put('/api/department/employee/remove', Department.RemoveEmployeeFromDept);
    app.post('/api/department/employee/search', Department.searchForEmployees);
    
    app.put('/api/department/manager/add', Department.AddManagerToDept);
    app.put('/api/department/manager/remove', Department.RemoveManagerFromDept);

    app.put('/api/department/post/add', Department.AddPostToDept);
    app.put('/api/department/post/remove', Department.RemovePostFromDept);

    app.delete('/api/department/remove', Department.removeDept);

}