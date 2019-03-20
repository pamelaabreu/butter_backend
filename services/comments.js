const {db} = require('./dbConnect');
const CommentService = {};

CommentService.create = (user_commented_id, post_commented_id, comment) => {
    const sql = `
    INSERT INTO comments (user_commented_id, post_commented_id, comment) VALUES
    ($[user_commented_id], $[post_commented_id], $[comment]) RETURNING id;`;

    return db.one(sql, { user_commented_id, post_commented_id, comment });
};

CommentService.read = (id) => {
    const sql = `
    SELECT
        comments.*
    FROM comments
    WHERE
        comments.id = $[id]
    `;

    return db.one(sql, { id });
};

CommentService.update = (id, user_commented_id, post_commented_id, comment) => {
    const sql = `
    UPDATE comments
    SET
        user_commented_id = $[user_commented_id],
        post_commented_id = $[post_commented_id],
        comment = $[comment]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, user_commented_id, post_commented_id, comment });
};

CommentService.delete = (id) => {
    const sql = `
    DELETE FROM notifications WHERE comment_action_id=$[id];
    DELETE FROM comments WHERE id=$[id] RETURNING id, post_commented_id;
    `;

    return db.one(sql, { id });
};

CommentService.readAllComments = (id) => {
    const sql = `
    SELECT 
        comments.*,
        users.username
    FROM comments
    JOIN users
    ON users.id = comments.user_commented_id
    WHERE
        comments.post_commented_id = $[id]
    `;
    return db.any(sql, {id});
};

CommentService.updatePostsComments = (id) => {
    const sql = `
    UPDATE posts
    SET
        comments = $[comments]
    WHERE
        id = $[id]
    `;

    return CommentService.readAllComments(id)
    .then(data => {
        const comments = data.length;
        return db.none(sql, { id, comments });
    })
    .catch(err => console.log(err))
};

CommentService.countComments = (id) => {
    const sql = `
    SELECT COUNT (post_commented_id)
    FROM comments
    WHERE post_commented_id = $[id];
    `;

    db.any(sql, { id })
};


module.exports = CommentService;