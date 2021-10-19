const Organization = require('../models/organization.model');

module.exports = {
    //create an organization
    createOrg(req, res) {
        // const userToken = jwt.sign({ id: user._id }, JWT_SECRET);
        Organization.create(req.body)
            .then(org => res.json(org))
            .catch(err => res.status(400).json(err))
    },

    //adding department in an organization
    addDepartment(req, res) {
        Organization.findByIdAndUpdate(
            {_id:req.body.orgId}, 
            {
                $push: { departments: req.body.deptId }
            },
            { new: true }
        )
            .then(org => res.json(org))
            .catch(err => res.status(400).json(err))
    },

    //removing department in an organization
    deleteDepartment(req, res) {
        Organization.findByIdAndUpdate(
            {_id:req.body.orgId},
            {
                $pull: {
                    departments: { _id: req.body.deptId }
                }
            },
            { multi: true }
        )
            .then(deleteDep => res.json(deleteDep))
            .catch(err => res.status(400).json(err))
    }
}





