const {db} = require('./dbConnect');
const TagService = {};


TagService.readAllTags = () => {
    const sql = `
    SELECT 
        tags.*
    FROM tags
    `;
    return db.any(sql);
};

TagService.readTag = (id) => {
    const sql = `
    SELECT 
        tags.*
    FROM tags
    WHERE tags.id = $[id]
    `;
    return db.one(sql, { id });
};

module.exports = TagService;