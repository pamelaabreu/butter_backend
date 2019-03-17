const {db} = require('./dbConnect');
const SavedPostService = {};

SavedPostService.create = (user_saved_id, post_saved_id) => {
    const sql = `
    INSERT INTO saved_posts (user_saved_id, post_saved_id) VALUES
    ($[user_saved_id], $[post_saved_id]);`;

    return db.one(sql, { user_saved_id, post_saved_id });
};

SavedPostService.read = (id) => {
    const sql = `
    SELECT
        saved_posts.*
    FROM saved_posts
    WHERE
        saved_posts.id = $[id]
    `;

    return db.one(sql, { id });
};


module.exports = SavedPostService;