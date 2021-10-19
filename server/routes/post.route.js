const Post = require('../controllers/post.controller');

module.exports = app => {

    //retrieve
    app.post('/api/post/department', Post.postsByDep);
    app.post('/api/post/userid', Post.findPostsByUserId);
    app.post('/api/post/postid', Post.findPostById);

    //update
    app.put('/api/post/updateById', Post.updatePostFromId);

    //delete
    app.delete('/api/post/deleteById', Post.deletePostById);
}
