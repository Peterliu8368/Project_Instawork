const Department = require("../models/department.model");
const Organization = require("../models/organization.model");
const Post = require("../models/post.model");
const User = require("../models/user.model");


// {newDeptobj, userId, privilege}
module.exports.createDeptAndAddUser = (req, res) => {
    Department.create(req.body.newDept)
        .then(newDept => {
            Organization.findByIdAndUpdate(
                {"_id": newDept.orgId}, 
                {
                    $push: { departments: newDept._id }
                },
                { new: true }
            )
            .then(org => {
                User.findOneAndUpdate(
                    {_id: req.body.userId}, 
                    {
                        $push: { organizations : {
                            orgId: org._id,
                            deptId: newDept._id,
                            privilege: req.body.privilege
                        }}
                    },
                    { new: true }
                )
                .then(user => {
                    console.log(user);
                    res.json(user)})
                .catch(err => res.status(400).json(err))
            })
            .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

// {newDeptobj, orgId}
module.exports.createDept = (req, res) => {
    Department.create(req.body.newDept)
        .then(newDept => {
            Organization.findByIdAndUpdate(
                {"_id": newDept.orgId}, 
                {
                    $push: { departments: newDept._id }
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
    Department.findById(req.body.deptId)
        .then(result => {
            if (result.managers.includes(req.body.userId)) {
                return res.status(400).json('User already manager in department.');
            } else {
                result.managers.push(req.body.userId);
                result.save();
            }
            console.log(result);
            User.findOneAndUpdate(
                {_id: req.body.userId}, 
                {
                    $push: { organizations : {
                        orgId: req.body.orgId,
                        deptId: req.body.deptId,
                        privilege: req.body.privilege
                    }}
                },
                { new: true }
            )
            .then(user => {
                res.json('Added')})
            .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}
//removing manager in a department
module.exports.RemoveManagerFromDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $pull: { managers: req.body.userId }
        })
        .then(result => {
            User.findOneAndUpdate(
                {_id: req.body.userId}, 
                {
                    $pull: { organizations : {
                        orgId: org._id,
                        deptId: newDept._id,
                        privilege: req.body.privilege
                    }}
                },
                { new: true }
            )
            .then(user => {
                console.log(user);
                res.json(user)})
            .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

//search for employees in department
module.exports.searchForEmployees = (req, res) => {
    var empList = [];
    Department.findById(req.body.deptId)
        .populate('employees')
        .then(res => res.employees)
        .then(emp => {
            emp.forEach(emp => {
                var fullName = emp.firstName + ' ' + emp.lastName;
                if (fullName.toLowerCase().includes(req.body.search.toLowerCase())) {
                    empList.push(emp);
                }
            res.status(200).json(empList)})
        })
        .catch(err => console.log(err));
}


//adding employee to a department
module.exports.AddEmployeeToDept = (req, res) => {
    Department.findById(req.body.deptId)
        .then(result => {
            if (result.employees.includes(req.body.userId)) {
                return res.status(400).json('User already employee in department.');
            } else {
                result.employees.push(req.body.userId);
                result.save();
            }
            console.log(result);
            User.findOneAndUpdate(
                {_id: req.body.userId}, 
                {
                    $push: { organizations : {
                        orgId: req.body.orgId,
                        deptId: req.body.deptId,
                        privilege: req.body.privilege
                    }}
                },
                { new: true }
            )
            .then(user => {
                res.json('Added')})
            .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}
//removing employee in a department
module.exports.RemoveEmployeeFromDept = (req, res) => {
    Department.findByIdAndUpdate(req.body.deptId, 
        {
            $pull: { employees: req.body.userId }
        })
        .then(result => {
            User.findOneAndUpdate(
                {_id: req.body.userId}, 
                {
                    $pull: { organizations : {
                        orgId: org._id,
                        deptId: newDept._id,
                        privilege: req.body.privilege
                    }}
                },
                { new: true }
            )
            .then(user => {
                console.log(user);
                res.json(user)})
            .catch(err => res.status(400).json(err))
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
}

//adding post in a department
//delete post by post id.
//req.body as follows { newPost: {userId, postText}, deptId }
module.exports.AddPostToDept = (req, res) => {
    Post.create(req.body.newPost)
        .then((newPost) => {
            Department.findByIdAndUpdate(req.body.deptId, 
                {
                    $push: { posts: newPost._id }
                }, {new: true})
                .then(result => res.json(newPost))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

//removing post in a department
//delete post by post id.
//req.body as follows { postId: _postId, deptId: _deptId }
module.exports.RemovePostFromDept = (req, res) => {
    Post.findByIdAndDelete(req.body.postId)
        .then(() => {
            Department.findByIdAndUpdate(req.body.deptId, 
                {
                    $pull: { posts: req.body.postId }
                }, {new: true})
                .then(result => res.json(result))
                .catch(err => res.status(400).json({ error: err }));
        })
        .catch(err => res.status(400).json({ error: err }));
    
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

module.exports.getDeptById = (req, res) => {
    Department.findById(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(400).json(err));
}