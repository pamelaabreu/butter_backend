const CommentService = require('../services/comments');
const NotificationService = require('../services/notifications');
const PostService = require('../services/posts');

const createCommentAndNotify = (userCommented_id, postCommented_id, comment) => {
  // first read the post from postCommented_id, return the user_posted_id
  const readPost = PostService.read(postCommented_id).then(data => data.user_posted_id);

  // then, create a comment
  const createComment = readPost.then(() => CommentService.create(userCommented_id, postCommented_id, comment));

  // when BOTH post and comment are created, use info from both promises to
  // write a notification
  const createNotif = Promise.all([readPost, createComment]).then(allData => {
    const userPosted_id = allData[0]; // this is data.user_posted_id
    const data = allData[1];          // this is createComment data

    return NotificationService.create(userCommented_id, userPosted_id, 'commented', null, null, data.id, postCommented_id)
  })

  // after notification is created, update the post comment
  return createNotif.then(() => CommentService.updatePostsComments(postCommented_id))
};

module.exports = {createCommentAndNotify, };
