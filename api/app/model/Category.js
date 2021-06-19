const CoreModel = require('./CoreModel');
const Joi = require('joi');

/**
 * @typedef Category
 * @property {number} id.required - id
 * @property {string} label.required - name of category
 * @property {string} route.required - name of route 
 * 
 */

class Category extends CoreModel {
    label;
    route;

    static tableName = 'category';

    constructor(obj) {
        super(obj);
        this.label = obj.label;
        this.route = obj.route;
    }

}

module.exports = Category;