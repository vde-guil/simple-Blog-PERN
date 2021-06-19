const CoreModel = require('./CoreModel');
const db = require('../database');



/**
 * @typedef Post
 * @property {number} id.required - id
 * @property {string} slug.required - slug of post
 * @property {string} title.required - title of the post 
 * @property {string} excerpt.required - excerpt of the post
 * @property {string} content.required - content of the content
 * @property {string} category.required - category name
 * @property {number} category_id.required - category id the post belongs to
 * 
 */

class Post extends CoreModel {
    slug;
    title;
    excerpt;
    content;
    category_id;
    

    static tableName = 'post';

    constructor(obj) {
        super(obj);
        this.slug = obj.slug;
        this.title = obj.title;
        this.excerpt = obj.excerpt;
        this.content = obj.content;
        this.category_id = obj.category_id;
        this.category = obj.category;
    }


    /**
     * methods that find all posts by its cat id
     * @param {Number} categoryId 
     * @returns {Array} of posts
     */

    static async findPostsByCat(categoryId) {
        const query = `SELECT * FROM post_with_category WHERE category_id = $1`;

            const { rows } = await db.query(query, [categoryId]);
            
            return rows.map( row => new Post(row));
     
    }

}

module.exports = Post;