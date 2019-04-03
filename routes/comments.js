const express = require('express');
const commentRouter = express.Router();
const CommentService = require('../services/comments');
const {createCommentAndNotify,} = require('../utils/comments');


// POST - CREATE 
commentRouter.post('/', (req, res, next) => {
    const { user_commented_id, post_commented_id, comment } = req.body;
    const userCommented_id = parseInt(user_commented_id);
    const postCommented_id = parseInt(post_commented_id);
    
    createCommentAndNotify(userCommented_id, postCommented_id, comment)
    .then(() => res.json({success: `User ID ${userCommented_id} created a comment on Post ID ${postCommented_id}.`}))
    .catch(next);
  });

// GET - READ ALL COMMENTS 
commentRouter.get('/:id/readAllComments', (req, res, next) => {
    const { id } = req.params;

    CommentService.readAllComments(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// DELETE - DELETE
commentRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    
    CommentService.delete(id)
    .then(data => CommentService.updatePostsComments(data.post_commented_id))
    .then(() => res.json({success: `Deleted comment on Post ID ${id}.`}))
    .catch(err => next(err))
  });

module.exports = commentRouter;