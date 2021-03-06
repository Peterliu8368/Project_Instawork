const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Organization name is required.'],
        minlength: [2, 'Organization name must be 2 characters.']
    },
    description: {
        type: String
    },
    departments: [
        { type: ObjectId, ref: 'Department' }
    ],
    admins: [
        {type: ObjectId, ref: "User"}
    ]
}, { timestamps: true })

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;