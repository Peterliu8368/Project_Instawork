const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required.'],
        minlength: [2, 'Department name must be at least 2 characters.']
    },
    organization: {type: ObjectId, ref: "Organization"},
    managers: [
        { type: ObjectId, ref: 'User' }
    ],
    employees: [
        { type: ObjectId, ref: 'User' }
    ],
    posts: [
        { type: ObjectId, ref: 'Post' }
    ]
}, { timestamps: true })

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;