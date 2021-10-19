const Department = require("../models/department.model");

//create a department
modules.export.createDept = (req, res) => {
    Department.create(req.body)
        .then(newDept => res.json(newDept))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

//adding user / manager to a department

//removing user / manager in a department