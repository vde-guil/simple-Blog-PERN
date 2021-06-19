const Category = require('../model/Category');

const controller = {

   
    allCategories: async (request, response) => {

        try {
            const categories = await Category.findAll();
            response.json(categories);
        } catch (error) {
            response.status(500).json(error.message);
        }
        
    }
};

module.exports = controller;