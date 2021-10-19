const Department = require("../models/department.model");

//create a department
modules.export.createDept = (req, res) => {
    Department.create(req.body)
        .then(newDept => {
            Organization.findByIdAndUpdate(
                req.body.orgId, 
                {
                    $push: { departments: req.body.deptId }
                },
                { new: true }
            )
                .then(org => res.json(newDept))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

//adding manager to a department
modules.export.AddManagerToDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $push: { managers: req.body.managerId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}
//removing manager in a department
modules.export.RemoveManagerFromDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $pull: { managers: req.body.managerId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}


//adding employee to a department
modules.export.AddEmployeeToDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $push: { employees: req.body.employeeId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}
//removing employee in a department
modules.export.RemoveEmployeeFromDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $pull: { employees: req.body.employeeId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

//adding post to a department
modules.export.AddPostToDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $push: { posts: req.body.postId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}
//removing post in a department
modules.export.RemovePostFromDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $pull: { posts: req.body.postId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}