const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const followRouter = require('./routes/follows');
const likeRouter = require('./routes/likes');
const commentRouter = require('./routes/comments');
const notificationRouter = require('./routes/notifications');
const tagRouter = require('./routes/tags');

// MIDDLEWARE NEEDED
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// ROUTES
app.get('/ping', (req, res) => {
    res.json({'pong': true})
});

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/follow', followRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);
app.use('/notification', notificationRouter);
app.use('/tag', tagRouter);

app.use((err, req, res, next) => {
    res.status(400).json({error: err.toString()});
  });

module.exports = { app }