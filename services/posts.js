const {db} = require('./dbConnect');
const PostService = {};

PostService.create = (user_posted_id, tag_id, content_url, title, summary, caption) => {
    const sql = `
    INSERT INTO posts (user_posted_id, tag_id, content_url, title, summary, caption) VALUES
    ($[user_posted_id], $[tag_id], $[content_url], $[title], $[summary], $[caption]);`;

    return db.none(sql, { user_posted_id, tag_id, content_url, title, summary, caption})
};

PostService.read = (id) => {
    const sql = `
        SELECT
            posts.*,
            tags.topic_name,
            tags.image_url AS tag_image
        FROM posts
        INNER JOIN tags
        ON posts.tag_id = tags.id
        WHERE posts.id = $[id]
    `;

    return db.one(sql, { id });
};

PostService.update = (id, tag_id, content_url, title, summary, caption) => {
    const sql = `
    UPDATE posts
    SET
        tag_id = $[tag_id],
        content_url = $[content_url],
        title = $[title],
        summary = $[summary],
        caption = $[caption]
    WHERE
        id = $[id]
    `;

    return db.none(sql, { id, tag_id, content_url, title, summary, caption });
};

PostService.delete = (id) => {
    const sql = `
    DELETE FROM posts WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

PostService.readAllPosts = (id) => {
    const sql = `
    SELECT 
        posts.*,
        tags.topic_name,
        tags.image_url AS tag_image
    FROM posts
    INNER JOIN tags
    ON posts.tag_id = tags.id
    WHERE
        posts.user_posted_id = $[id]
    `;

    return db.any(sql, { id });
}

module.exports = PostService;