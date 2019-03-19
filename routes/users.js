const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/users');

// POST - CREATE 
userRouter.post('/', (req, res, next) => {
    const { birthname, username, email, firebase_uid, profile_img, birthday, joining_reason } = req.body;

    UserService.create(birthname, username, email, firebase_uid, profile_img, birthday, joining_reason)
      .then(data => {
        res.json({success: `Created User with username ${username}.`});
      })
      .catch(err => {
        next(err);
      })
  });
  
// GET - READ ALL USERS 
userRouter.get('/all', (req, res, next) => {
    UserService.readAllUsers()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// GET - READ 
userRouter.get('/:id/', (req, res, next) => {
    const {id} = req.params;
  
    UserService.read(id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

// PUT - UPDATE
userRouter.put('/:id', (req, res, next) => {
    const { birthname, username, email, firebase_uid, profile_img, birthday } = req.body;
    const { id } = req.params;
  
    UserService.update(id, birthname, username, email, firebase_uid, profile_img, birthday)
      .then(data => {
        res.json({success: `Updated User with username ${username}.`});
      })
      .catch(err => {
        next(err);
      })
  });

// DELETE - DELETE
userRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    
    UserService.delete(id)
      .then(data => {
        res.json({success: `Deleted User with ID: ${id}`});
      })
      .catch(err => {
        next(err);
      })
  });


module.exports = userRouter;