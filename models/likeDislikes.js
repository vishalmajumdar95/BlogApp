const { Model } = require('objection');
const knex = require('../config/db_config');
Model.knex(knex);

// LikeDislike Class
class LikeDislike extends(Model) {
    static get tableName() {
        return 'likeDislike'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id'],
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                like: { type: Boolean },
                dislike: { type: Boolean },
            }
        }
    }
}
module.exports = LikeDislike;