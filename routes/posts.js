const express = require('express');
const postRouter = express.Router();
const PostService = require('../services/posts');

// POST - CREATE 
postRouter.post('/', (req, res, next) => {
    const { user_posted_id, tag_id, content_url, title, summary, caption } = req.body;
  
    PostService.create(user_posted_id, tag_id, content_url, title, summary, caption)
      .then(data => {
        res.json({success: `Created Post with title ${title}.`});
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ 
postRouter.get('/:id/', (req, res, next) => {
    const {id} = req.params;
  
    PostService.read(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// PUT - UPDATE
postRouter.put('/:id', (req, res, next) => {
    const { tag_id, content_url, title, summary, caption } = req.body;
    const {id} = req.params;
  
    PostService.update(id, tag_id, content_url, title, summary, caption)
      .then(data => {
        res.json({success: `Updated Post with title ${title} with ID: ${id}`});
      })
      .catch(err => {
        next(err);
      })
  });

// DELETE - DELETE
postRouter.delete('/:id', (req, res, next) => {
    const {id} = req.params;
  
    PostService.delete(id)
      .then(data => {
        res.json({success: `Deleted post with ID: ${id}`});
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ ALL POSTS 
postRouter.get('/:id/all', (req, res, next) => {
    const {id} = req.params;
  
    PostService.readAllPosts(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

module.exports = postRouter;