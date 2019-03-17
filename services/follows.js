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

FollowService.readAllFollowers = (id) => {
    const sql = `
    SELECT 
        follows.user_follower_id
    FROM follows
    WHERE
        follows.user_following_id = $[id]
    `;
    return db.any(sql, {id});
}

FollowService.readAllFollowings = (id) => {
    const sql = `
    SELECT 
        follows.user_following_id
    FROM follows
    WHERE
        follows.user_follower_id = $[id]
    `;
    return db.any(sql, {id});
}

FollowService.updateUsersFollowers = (id) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE users
    SET
        updated_at = $[updated_at],
        followers_number = $[followers_number]
    WHERE
        id = $[id]
    `;

    return FollowService.readAllFollowers(id)
    .then(data => {
        const followers_number = data.length;
        return db.none(sql, { id, updated_at, followers_number });
    })
    .catch(err => console.log(err))
};

FollowService.updateUsersFollowings = (id) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE users
    SET
        updated_at = $[updated_at],
        followings_number = $[followings_number]
    WHERE
        id = $[id]
    `;

    return FollowService.readAllFollowings(id)
    .then(data => {
        const followings_number = data.length;
        return db.none(sql, { id, updated_at, followings_number });
    })
    .catch(err => console.log(err))
};

module.exports = FollowService;