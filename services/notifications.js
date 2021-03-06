const {db} = require('./dbConnect');
const NotificationService = {};

NotificationService.create = (user_action_id, user_received_action_id, notification_type, follower_action_id, like_action_id, comment_action_id, post_action_id) => {
    const sql = `
    INSERT INTO notifications (user_action_id, user_received_action_id, notification_type, follower_action_id, like_action_id, comment_action_id, post_action_id) VALUES
    ($[user_action_id], $[user_received_action_id], $[notification_type], $[follower_action_id], $[like_action_id], $[comment_action_id], $[post_action_id]);`;

    return db.none(sql, { user_action_id, user_received_action_id, notification_type, follower_action_id, like_action_id, comment_action_id, post_action_id });
};

NotificationService.read = (id) => {
    const sql = `
    SELECT
        notifications.*
    FROM notifications
    WHERE
        notifications.id = $[id]
    `;

    return db.one(sql, { id });
};

NotificationService.update = (user_action_id, user_received_action_id, notification_type, follower_action_id, like_action_id, comment_action_id, post_action_id) => {
    const sql = `
    UPDATE notifications
    SET
        user_action_id = $[user_action_id],
        notification_type = $[notification_type],
        follower_action_id = $[follower_action_id],
        like_action_id = $[like_action_id],
        comment_action_id = $[comment_action_id],
        user_received_action_id = $[user_received_action_id],
        post_action_id = $[post_action_id]
    WHERE
        id=$[id]
    `;

    return db.none(sql, { id, user_action_id, user_received_action_id, notification_type, follower_action_id, like_action_id, comment_action_id, post_action_id });
};

NotificationService.delete = (id) => {
    const sql = `
    DELETE FROM notifications WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

NotificationService.readAllNotifications = (id) => {
    const sql = `
    SELECT 
        n.*,
        u.username,
        p.content_url
    FROM notifications AS n
    LEFT JOIN users AS u ON u.id = n.user_action_id
    LEFT JOIN posts AS p ON p.id = n.post_action_id
    WHERE
        n.user_received_action_id = $[id]
    `;
    return db.any(sql, { id });
};

module.exports = NotificationService;