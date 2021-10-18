const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const organizationSchema = new mongoose.Schema({

}, { timestamps: true })

const Post = mongoose.model("Organization", organizationSchema);
module.exports = Organization;