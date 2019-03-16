const {db} = require('./dbConnect');
const PostService = {};

PostService.create = (user_posted_id, tag_id, content_url, title, summary, caption, likes) => {
    const sql = `
    INSERT INTO posts (user_posted_id, tag_id, content_url, title, summary, caption, likes) VALUES
    ($[user_posted_id], $[tag_id], $[content_url], $[title], $[summary], $[caption], $[likes]);`;

    return db.one(sql, { user_posted_id, tag_id, content_url, title, summary, caption, likes })
};

PostService.read = (id) => {
    const sql = `
        SELECT
            posts.*
        FROM posts
        WHERE posts.id = $[id]
    `;

    return db.one(sql, { id });
};

PostService.update = (id, tag_id, content_url, title, summary, caption) => {
    const updated_at = Date.now();
    const sql = `
    UPDATE posts
    SET
        updated_at = $[updated_at],
        tag_id = $[tag_id],
        content_url = $[content_url],
        title = $[title],
        summary = $[summary],
        caption = $[caption]
    WHERE
        id = $[id]
    `;

    return db.none(sql, { id, updated_at, tag_id, content_url, title, summary, caption });
};

PostService.delete = (id) => {
    const sql = `
    DELETE FROM posts WHERE id=$[id]
    `;

    return db.none(sql, { id });
};

module.exports = PostService;