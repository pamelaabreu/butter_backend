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

FollowService.update = (id, user_follower_id, user_following_id) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE follows
    SET
        updated_at = $[updated_at],
        user_follower_id = $[user_follower_id],
        user_following_id = $[user_following_id]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, updated_at, user_follower_id, user_following_id });
};

FollowService.delete = (id) => {
    const sql = `
    DELETE FROM follows WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

module.exports = FollowService;