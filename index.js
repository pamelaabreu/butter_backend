const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const postRouter = require('./routes/posts');
const userRouter = require('./routes/users');
const followRouter = require('./routes/follows');
const likeRouter = require('./routes/likes');
const commentRouter = require('./routes/comments');

// MIDDLEWARE NEEDED
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// ROUTES
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/follow', followRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);

app.use((err, req, res, next) => {
    res.status(400).json({error: err.toString()});
  });

app.listen(port, () => {
    console.log('Butter API is running on Port: '+port);
  });