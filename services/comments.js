const {db} = require('./dbConnect');
const CommentService = {};

CommentService.create = (user_commented_id, post_commented_id, comment) => {
    const sql = `
    INSERT INTO comments (user_commented_id, post_commented_id, comment) VALUES
    ($[user_commented_id], $[post_commented_id], $[comment]);`;

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
    const updated_at = Date.now();
    const sql = `
    UPDATE comments
    SET
        updated_at = $[updated_at],
        user_commented_id = $[user_commented_id],
        post_commented_id = $[post_commented_id],
        comment = $[comment]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, updated_at, user_commented_id, post_commented_id, comment });
};

CommentService.delete = (id) => {
    const sql = `
    DELETE FROM comments WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

CommentService.readAllComments = (id) => {
    const sql = `
    SELECT 
        comments.*
    FROM comments
    WHERE
        comments.post_commented_id = $[id]
    `;
    return db.any(sql, {id});
}

CommentService.updatePostsComments = (id) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE posts
    SET
        updated_at = $[updated_at],
        comments = $[comments]
    WHERE
        id = $[id]
    `;

    return CommentService.readAllComments(id)
    .then(data => {
        const comments = data.length;
        return db.none(sql, { id, updated_at, comments });
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