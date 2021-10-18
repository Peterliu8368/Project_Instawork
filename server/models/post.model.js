const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const postSchema = new mongoose.Schema({

}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);
module.exports = Post;