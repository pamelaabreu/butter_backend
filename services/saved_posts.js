const {db} = require('./dbConnect');
const SavedPostService = {};

SavedPostService.create = (user_saved_id, post_saved_id) => {
    const sql = `
    INSERT INTO saved_posts (user_saved_id, post_saved_id) VALUES
    ($[user_saved_id], $[post_saved_id]);`;

    return db.one(sql, { user_saved_id, post_saved_id });
};


module.exports = SavedPostService;