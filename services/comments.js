const {db} = require('./dbConnect');
const CommentsService = {};

CommentsService.create = (user_commented_id, post_commented_id, comment) => {
    const sql = `
    INSERT INTO comments (user_commented_id, post_commented_id, comment) VALUES
    ($[user_commented_id], $[post_commented_id],$[comment]);`;

    return db.one(sql, { user_commented_id, post_commented_id, comment });
}

CommentsService.read = (id) => {
    const sql = `
    SELECT
        comments.*
    FROM comments
    WHERE
        comments.id = $[id]
    `;

    return db.one(sql, { id });
};


CommentsService.update = (id, user_commented_id, post_commented_id, comment) => {
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


module.exports = CommentsService;