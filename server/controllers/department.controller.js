const Department = require("../models/department.model");

//create a department
module.exports.createDept = (req, res) => {
    Department.create(req.body.newDept)
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
module.exports.AddManagerToDept = (req, res) => {
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
module.exports.RemoveManagerFromDept = (req, res) => {
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
module.exports.AddEmployeeToDept = (req, res) => {
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
module.exports.RemoveEmployeeFromDept = (req, res) => {
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
module.exports.AddPostToDept = (req, res) => {
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
module.exports.RemovePostFromDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $pull: { posts: req.body.postId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

module.exports.removeDept = (req, res) => {
    Department.findByIdAndDelete(req.body.deptId)
        .then(result => {
            Organization.findByIdAndUpdate(
                req.body.orgId,
                {
                    $pull: {
                        departments: result._id
                    }
                },
                { multi: true }
            )
                .then(deleteDep => res.json(result))
                .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
    };