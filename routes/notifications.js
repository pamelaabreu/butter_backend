const express = require('express');
const notificationRouter = express.Router();
const NotificationService = require('../services/notifications');

// GET - READ ALL LIKES 
notificationRouter.get('/:id/readAllNotifications', (req, res, next) => {
    const { id } = req.params;

    NotificationService.readAllNotifications(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

module.exports = notificationRouter;