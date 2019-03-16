const {db} = require('./dbConnect');
const PostService = {};

PostService.create = (user_posted_id, tag_id, content_url, title, summary, caption, likes) => {
    const sql = `
    INSERT INTO posts (user_posted_id, tag_id, content_url, title, summary, caption, likes) VALUES
    ($[user_posted_id], $[tag_id], $[content_url], $[title], $[summary], $[caption], $[likes]);`;

    return db.one(sql, { user_posted_id, tag_id, content_url, title, summary, caption, likes })
}

PostService.read = (id) => {
    const sql = `
        SELECT
            posts.*
        FROM posts
        WHERE posts.id = $[id]
    `;

    return db.one(sql, { id });
}




module.exports = PostService;