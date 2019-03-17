const {db} = './dbConnect';
const FollowService = {};

FollowService.create = (user_follower_id, user_following_id) => {
    const sql = `
    INSERT INTO follows (user_follower_id, user_following_id) VALUES
    ($[user_follower_id], $[user_following_id]);`;

    return db.one(sql, { user_follower_id, user_following_id });
};

FollowService.read = (id) => {
    const sql = `
    SELECT
        follows.*
    FROM follows
    WHERE
        follows.id = $[id]
    `;

    return db.one(sql, { id });
};

module.exports = FollowService;