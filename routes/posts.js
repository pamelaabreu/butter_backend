const express = require('express');
const postRouter = express.Router();
const PostService = require('../services/posts');

// POST - CREATE 
postRouter.post('/', (req, res, next) => {
    const { user_posted_id, tag_id, content_url, title, summary, caption } = req.body;
  
    PostService.create(user_posted_id, tag_id, content_url, title, summary, caption)
      .then(data => {
        res.status(200);
        res.json({data: data.id});
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ ALL POSTS 
postRouter.get('/allPosts/all', (req, res, next) => {

  PostService.readAllPosts()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

// GET - READ 
postRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
  
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
    const { id } = req.params;
  
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
    const { id } = req.params;
  
    PostService.delete(id)
      .then(data => {
        res.json({success: `Deleted post with ID: ${id}`});
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ ALL USER POSTS 
postRouter.get('/all/:id', (req, res, next) => {
    const { id } = req.params;
  
    PostService.readAllUsersPosts(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });


module.exports = postRouter;