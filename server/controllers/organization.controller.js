const Organization = require('../models/organization.model');
const User = require('../models/user.model');
const Department = require('../models/department.model');

//create an organization
// need newOrg obj, userId
module.exports.createOrg = (req, res) => {
    //create the new organization
    Organization.create(req.body.newOrg)
        .then(org => {
            //push the creator to admin group
            Organization.findByIdAndUpdate(org._id, 
                {
                    $push: { admins: req.body.userId }
                }, {new: true}
                ).then(organ => {
                    //create the default admin department
                    Department.create({name: "Admin", organization: org._Id})
                        .then(dept => {
                            //push the new admin dept to new organization
                            Organization.findByIdAndUpdate(org._id, 
                                {
                                    $push: { departments: dept._id }
                                }, {new: true})
                                .then(result => {
                                    User.findByIdAndUpdate(req.body.userId, {
                                        $push: {organizations: {
                                            orgId: org._id,
                                            departments: [{
                                                deptId: dept._id,
                                                privilege: 3
                                            }]
                                        }}
                                    }, {new: true})
                                        .then(res => res.json(res))
                                        .catch(err => {
                                            res.status(400).json(err);
                                        });
                                })
                                .catch(err => {
                                    res.status(400).json(err);
                                });
                        })
                        .catch(err => {
                            res.status(400).json(err);
                        });
                })
                .catch(err => res.status(400).json(err))
        })
        .catch(err => res.status(400).json(err))
}

//add admin users to an organization
module.exports.addAdmin = (req, res) => {
    Organization.findByIdAndUpdate(req.body.orgId, 
        {
            $push: { admins: req.body.userId }
        })
        .then(result => res.json(result))
        .catch(err => {
            res.status(400).json(err);
        });
}





