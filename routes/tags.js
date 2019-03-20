const express = require('express');
const tagRouter = express.Router();
const TagService = require('../services/tags');

// GET - READ ALL TAGS 
tagRouter.get('/all', (req, res, next) => {
    TagService.readAllTags()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

module.exports = tagRouter;