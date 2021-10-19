const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: 'User' },
    postText: {
        type: String,
        required: [true, 'Work plan is required.'],
        minlength: [10, 'Work plan must be at least 10 characters.']
    },
    reviewMessage: {
        type: String,
    },
    workResult: {
        type: String,
    }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema);
module.exports = Post;