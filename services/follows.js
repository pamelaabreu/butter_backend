const {db} = './dbConnect';
const FollowService = {};

FollowService.create = (user_follower_id, user_following_id) => {
    const sql = `
    INSERT INTO follows (user_follower_id, user_following_id) VALUES
    ($[user_follower_id], $[user_following_id]);`;

    return db.one(sql, { user_follower_id, user_following_id });
};

module.exports = FollowService;