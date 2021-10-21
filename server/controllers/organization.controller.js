const Organization = require('../models/organization.model');
const User = require('../models/user.model');

//create an organization
module.exports.createOrg = (req, res) => {
    Organization.create(req.body.newOrg)
        .then(org => {
            User.findByIdAndUpdate(req.body.userId, 
                {
                    $push: { organizations: org._id }
                }, {new: true}
                ).then(user => res.json(org))
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
            res.status(400).json({ error: err });
        });
}

module.exports.getAllDepts = (req, res) => {
    Organization.findById(req.params.orgId)
        .populate('departments')
        .then(result => {
            res.status(200).json(result.departments)
        })
        .catch(err => res.status(400).json(err));
}





