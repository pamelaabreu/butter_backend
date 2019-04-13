const express = require('express');
const followRouter = express.Router();
const FollowService = require('../services/follows');
const NotificationService = require('../services/notifications');

// POST - CREATE 
followRouter.post('/', (req, res, next) => {
    const { user_follower_id, user_following_id } = req.body;
    const follower_id = parseInt(user_follower_id);
    const following_id = parseInt(user_following_id);
    
    let followId = null;
    FollowService.create(follower_id, following_id)
      .then(data => {
        followId = data.id;
        return NotificationService.create(follower_id, following_id, 'followed', data.id, null, null, null)
      })
      .then(() => FollowService.updateUsersFollowers(following_id))
      .then(() =>  FollowService.updateUsersFollowings(follower_id))
      .then(() => res.json({followId}))
      .catch(err => next(err))
  });

// GET - READ ALL FOLLOWERS 
followRouter.get('/:id/readAllFollowers', (req, res, next) => {
    const { id } = req.params;

    FollowService.readAllFollowers(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ ALL FOLLOWINGS 
followRouter.get('/:id/readAllFollowings', (req, res, next) => {
    const { id } = req.params;

    FollowService.readAllFollowings(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ 
followRouter.get('/:id/', (req, res, next) => {
    const { id } = req.params;
  
    FollowService.read(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// GET - CHECK FOLLOWING 
followRouter.get('/checkFollowing/:userFollowerId/:userFollowingId', (req, res, next) => {
  const { userFollowerId, userFollowingId } = req.params;

  FollowService.checkFollow(userFollowerId, userFollowingId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      const sqlError = "No data returned from the query."
      if(err.message.toLowerCase() === sqlError.toLowerCase()){
        res.json(null)
      } else next(err);
    })
});

// PUT - UPDATE
followRouter.put('/:id', (req, res, next) => {
    const { user_follower_id, user_following_id } = req.body;
    const follower_id = parseInt(user_follower_id);
    const following_id = parseInt(user_following_id);
    const { id } = req.params;
  
    FollowService.update(id, follower_id, following_id)
      .then(data => {
        res.json({success: `Updated Follow!`});
      })
      .catch(err => {
        next(err);
      })
  });

// DELETE - DELETE
followRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    let follower_id = null;

    FollowService.delete(id)
      .then(data => {
        const { user_follower_id, user_following_id } = data;
        follower_id = user_follower_id;
        return FollowService.updateUsersFollowers(user_following_id)
      })
      .then(() => FollowService.updateUsersFollowings(follower_id))
      .then(() => res.json({success: `Deleted Follow with ID: ${id}`}))
      .catch(err => {
        next(err);
      })
  });

module.exports = followRouter;