const Joi = require('joi');

const postSchema = Joi.object({
    slug: Joi.string().required(),
    title: Joi.string().required(),
    excerpt: Joi.string().required(),
    content: Joi.string().required(),
    category_id: Joi.number().integer().min(1).required()
});

module.exports = postSchema;