const Post = require('../models/post.model');
const Department = require('../models/department.model');

//get all posts from users who are in a certain department, filtered by date and privilege.
//Req.body should contain an object in format: { department: depName }.
module.exports.postsByDep = (req, res) => {
    Department.findById(req.body.deptId).populate('managers').populate('employees')
        .populate({
            path: 'posts',
            populate: { path: 'userId'}
        })
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => res.status(400).json({ error: err }));
}

//Get one post
//Get post by post _id.
//Structure req.body as { id: _postId }.
module.exports.findPostById = (req, res) => {
    Post.findById(req.body.id)
        .then(post => res.status(200).json({ post: post }))
        .catch(err => res.status(400).json({ error: err }));
}
//Get posts by user _id.
//Req.body should be in format of { userId: _userId }.
module.exports.findPostsByUserId = (req, res) => {
    Post.find(req.body)
        .then(post => res.status(200).json({ post: post }))
        .catch(err => res.status(400).json({ error: err }));
}

//edit a post
//Update post by postId.
//Structure req.body as following { postId: _postId, (optional)postText: newText, (optional)reviewMessage: newMessage, (optional)workResult: newResult }.
module.exports.updatePostFromId = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, req.body, { new: true })
        .then(post => res.status(200).json({ updatedPost: post }))
        .catch(err => res.status(400).json({ error: err }));
}
