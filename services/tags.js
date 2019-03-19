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

module.exports = TagService;