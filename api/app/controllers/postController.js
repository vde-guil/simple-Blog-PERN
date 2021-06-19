const Post = require('../model/Post');
const Category = require('../model/Category');


const controller = {

    allPosts: async (request, response) => {
        try {
            const posts = await Post.findAll();
            response.json(posts);


        } catch (error) {
            response.status(500).json(error);
        }
    },



    getOnePost: async (request, response) => {
        const postId = +request.params.id;

        try {
            const post = await Post.findByPk(postId);

            if (!post) {
                return response.status(404).json(`404 Post ${postId} Not found`);
            }
            return response.json(post)

        } catch (error) {
            response.status(500).json(error)
        }
    },


    getPostsFromCategory: async (request, response) => {
        const categoryId = request.params.id;

        try {
            const category = await Category.findByPk(categoryId);

            if (!category) {
                response.status(404).json(`404 category ${categoryId} not found`);
            } else {
                const posts = await Post.findPostsByCat(category.id);
                response.json(posts);
            }

        } catch (error) {
            response.status(500).json(error);
        }
    },

    addPost: async (request, response) => {

        const post = new Post(request.body);
        try {
            await post.insert();
            response.status(201).json(post);

        } catch (error) {
            response.status(500).json(error.message);
        }


    }
};

module.exports = controller;