const Organization = require('../models/organization.model');

//create an organization
module.exports.createOrg = (req, res) => {
    Organization.create(req.body)
        .then(org => res.json(org))
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





