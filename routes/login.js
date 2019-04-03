const express = require('express');
const loginRouter = express.Router();
const LoginService = require('../services/login');

// GET - READ USER ID
loginRouter.get('/:firebase_uid/', (req, res, next) => {
    const {firebase_uid} = req.params;
  
    LoginService.read(firebase_uid)
      .then(data => {
        res.status(200);
        res.json(data);
      })
      .catch(err => {
        next(err);
      })
  });

module.exports = loginRouter;