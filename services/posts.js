const {db} = require('./dbConnect');
const PostService = {};

PostService.create = (user_posted_id, tag_id, content_url, title, summary, caption) => {
    const sql = `
    INSERT INTO posts (user_posted_id, tag_id, content_url, title, summary, caption) VALUES
    ($[user_posted_id], $[tag_id], $[content_url], $[title], $[summary], $[caption]) RETURNING id;`;

    return db.one(sql, { user_posted_id, tag_id, content_url, title, summary, caption })
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

PostService.readAllUsersPosts = (id) => {
    const sql = `
    SELECT 
        posts.*
    FROM posts
    WHERE
        posts.user_posted_id = $[id]
    `;

    return db.any(sql, { id });
};

PostService.readAllPosts = () => {
    const sql = `
    SELECT 
        posts.*
    FROM posts
    `;

    return db.any(sql);
};


module.exports = PostService;