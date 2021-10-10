const { Model } = require('objection');
const knex = require('../config/db_config');
Model.knex(knex);

// Blog Class
class Blogs extends Model {
    static get tableName() {
        return 'blogs';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title'],
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                description: { type: 'string' },
                author: { type: 'string' },
            }
        }
    }
}
module.exports = Blogs;