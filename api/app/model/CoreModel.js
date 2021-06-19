const db = require('../database');

class CoreModel {
    id;
    static tableName = null;
    static schema = null;

    constructor(obj) {
        this.id = obj.id;
    }


    /******************/
    /*  Utils         */
    /******************/

    checkNumber(value, fieldName) {
        if (typeof value === "number" && value > 0) {
            this["_" + fieldName] = value;
        } else {
            console.error(fieldName + " doit contenir une valeur de type number");
        }
    }

    checkString(value, fieldName) {
        if (typeof value === "string") {
            this["_" + fieldName] = value;
        } else {
            console.error(fieldName + " doit contenir une valeur de type string");
        }
    }

    /******************/
    /*  CRUD - READ   */
    /******************/

    /**
     * static method that queries the DB to get all rows from specific entity
     * @returns 
     */
    static async findAll() {
        let query;
        if (this.tableName === 'post') {
            query = `SELECT * FROM ${this.tableName}_with_category;`;
        }
        else {
            query = `SELECT * FROM ${this.tableName};`;
        }

        const { rows } = await db.query(query);

        return rows.map(row => new this(row));

    }

    /**
     * static method that queries the DB to get one row by its id from an entity (see child classes)
     * @param {Number} id 
     * @returns 
     */
    static async findByPk(id) {


        let query;
        if (this.tableName === 'post') {
            query = `SELECT * FROM ${this.tableName}_with_category`;
        }
        else {
            query = `SELECT * FROM ${this.tableName}`;
        }
        query += ` WHERE id = $1`;

        const { rows } = await db.query(query, [id]);

        if (rows[0]) {
            return new this(rows[0]);
        }
        return null;
    }

    /**
     * methods that queries the DB to insert a row in an entity
     * @returns 
     */

    async insert() {
        const values = [];
        const params = [];
        const indexes = [];
        let index = 1;

        for (const param in this) {
            if (param === 'id' || param === 'category')
                continue;
            values.push(this[param]);
            params.push(param);
            indexes.push(`$${index++}`);
        }

        const query = `INSERT INTO ${this.constructor.tableName} (${params.join(', ')}) VALUES (${indexes.join(', ')}) RETURNING id`;

        try {
            const data = await db.query(query, values);
            this.id = +data.rows[0].id;

        } catch (error) {

            if (error.detail) {
                throw new Error(error.detail);
            }
            throw new Error(error.message);
        }
    }

    /**
     * 
     * @throws {Error} potential server error
     */
    async save() {
        if (this.id) {
            //TODO: coder update
        } else {
            return await this.insert();
        }
    }
}

module.exports = CoreModel;