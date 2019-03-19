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
    const sql = `
    UPDATE follows
    SET
        user_follower_id = $[user_follower_id],
        user_following_id = $[user_following_id]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, user_follower_id, user_following_id });
};

FollowService.delete = (id) => {
    const sql = `
    DELETE FROM follows WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

FollowService.readAllFollowers = (id) => {
    const sql = `
    SELECT 
        follows.user_follower_id,
        users.id AS user_id,
        users.birthname,
        users.username,
        users.email,
        users.profile_img,
        users.birthday,
        users.joining_reason,
        users.followers_number,
        users.followings_number,
        users.firebase_uid
    FROM follows
    INNER JOIN users
    ON follows.user_follower_id = users.id
    WHERE
        follows.user_following_id = $[id]
    `;
    return db.any(sql, { id });
}

FollowService.readAllFollowings = (id) => {
    const sql = `
    SELECT 
        follows.user_following_id,
        users.id AS user_id,
        users.birthname,
        users.username,
        users.email,
        users.profile_img,
        users.birthday,
        users.joining_reason,
        users.followers_number,
        users.followings_number,
        users.firebase_uid
    FROM follows
    INNER JOIN users
    ON follows.user_following_id = users.id
    WHERE
        follows.user_follower_id = $[id]
    `;
    return db.any(sql, { id });
};

FollowService.updateUsersFollowers = (id) => {
    const sql = `
    UPDATE users
    SET
        followers_number = $[followers_number]
    WHERE
        id = $[id]
    `;

    return FollowService.readAllFollowers(id)
    .then(data => {
        const followers_number = data.length;
        return db.none(sql, { id, followers_number });
    })
    .catch(err => console.log(err))
};

FollowService.updateUsersFollowings = (id) => {
    const sql = `
    UPDATE users
    SET
        followings_number = $[followings_number]
    WHERE
        id = $[id]
    `;

    return FollowService.readAllFollowings(id)
    .then(data => {
        const followings_number = data.length;
        return db.none(sql, { id, followings_number });
    })
    .catch(err => console.log(err))
};

FollowService.countFollowers = (id) => {
    const sql = `
    SELECT COUNT (user_follower_id)
    FROM follows
    WHERE user_follower_id = $[id];
    `;

    db.any(sql, { id })
};

FollowService.countFollowings = (id) => {
    const sql = `
    SELECT COUNT (follows.user_following_id)
    FROM follows
    WHERE user_follower_id = $[id];
    `;

    return db.any(sql, { id });
};

module.exports = FollowService;