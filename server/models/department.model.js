const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const departmentSchema = new mongoose.Schema({

}, { timestamps: true })

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;