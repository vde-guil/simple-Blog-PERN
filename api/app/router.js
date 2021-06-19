// npm imports
const express = require('express');

// controllers
const postController = require("./controllers/postController");
const categoryController = require("./controllers/categoryController");

// services
const postSchema = require('./schemas/post')
const { validateBody } = require('./services/validator');
const { cache, flush } = require('./services/cache');

// on initialise notre router
const router = express.Router();

/**
   * 
   * returns all the posts from the DB in JSON
  * @route GET /posts
  * @group Posts
  * @returns {Array<Post>} - 200 - a JSON array of post objects
  */

router.get('/posts', cache, postController.allPosts);

/**
     *  returns one post in JSON by its id
     * 
     * @route GET /posts/{id}
     * @group Posts
     * @param {integer} id.path.required - id of the post to return
     * @returns {Post.model} 200 - a json object of a Post
     * @returns {string} 404
     */

router.get('^/posts/:id(\\d+$)', cache, postController.getOnePost)

/**
     * returns all the post from a specific category (by its id)
     * 
     * @route GET /posts/category/{id}
     * @group Posts
     * @param {number} id.path.required - id of the category the posts are from
     * @returns {Array<Post>} - 200 - an JSON array of post objects
     * 
     */

router.get('^/posts/category/:id([0-9]+$)', cache, postController.getPostsFromCategory)

/**
   *  gets a request.body to create post in DB. it first validates it before inserting in DB
   * 
   * @route POST /posts
   * @group Posts
   * @param {string} slug.body.required - url 
   * @param {string} title.body.required - title of the post 
   * @param {string} excerpt.body.required - excerpt of the post 
   * @param {string} content.body.required - content of the post 
   * @param {integer} category_id.body.required - category id 
   * @return {Post.model} 200 - post response
   *  
   */
  //pour que notre validateur soit universel, va devoir connaitre le schema a utiliser pour valider les donnees
  // on va imaginer fonction qui prend le schema en param et retourne le middleware

router.post('/posts', validateBody(postSchema), flush, postController.addPost);


/**
    *  returns all categories from DB
    * 
     * @route GET /categories
     * @group Categories
    * @returns {json} - 200 - an JSON array of category objects
    */
router.get('/categories', cache, categoryController.allCategories);

router.use((req, res) =>{
res.status(404).json('404 path not found');
})

module.exports = router;