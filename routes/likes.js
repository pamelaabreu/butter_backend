const express = require('express');
const likeRouter = express.Router();
const LikeService = require('../services/likes');
const NotificationService = require('../services/notifications');
const PostService = require('../services/posts');

// POST - CREATE 
likeRouter.post('/', (req, res, next) => {
    const { user_like_id, post_like_id } = req.body;
    const userLike_id = parseInt(user_like_id);
    const postLike_id = parseInt(post_like_id);
    let userPosted_id = null;

    PostService.read(postLike_id)
    .then(data => userPosted_id = data.user_posted_id)
    .then(() => LikeService.create(userLike_id, postLike_id))
    .then(data => NotificationService.create(userLike_id, userPosted_id, 'liked', null, data.id, null, postLike_id))
    .then(() => LikeService.updateLikes(postLike_id))
    .then(() => res.json({success: `User ID ${userLike_id} created liked on Post ID ${postLike_id}.`}))
    .catch(err => next(err))
  });

// GET - READ ALL LIKES 
likeRouter.get('/:id/readAllLikes', (req, res, next) => {
    const { id } = req.params;

    LikeService.readAllLikes(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// DELETE - DELETE
likeRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    
    LikeService.delete(id)
    .then(data => LikeService.updateLikes(data.post_like_id))
    .then(() => res.json({success: `Deleted like on Post ID ${id}.`}))
    .catch(err => next(err))
  });

module.exports = likeRouter;