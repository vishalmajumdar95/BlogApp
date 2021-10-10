const LikeDislike = require("../models/likeDislikes");

module.exports = class LikeDislikeService {

    async createLike(like) {
        const user = await LikeDislike.query().where("user_id", like.user_id)
        console.log(user)
        if (!user[0]) {
            return await LikeDislike.query().insert(like)
        }
        return await LikeDislike.query()
            .update(like)
            .where("user_id", like.user_id)
    }

    async createDislike(dislike) {
        const user = await LikeDislike.query().where("user_id", dislike.user_id)
        console.log(user)
        if (!user[0]) {
            return await LikeDislike.query().insert(dislike)
        }
        return await LikeDislike.query()
            .update(dislike)
            .where("user_id", dislike.user_id)
    }

    async findAllLikes(like) {
        const likes = await LikeDislike.query().sum('like', true)
        return likes;
    }
    async findAllDislikes(dislike) {
        const dislikes = await LikeDislike.query().sum('dislike', false)
        return dislikes;
    }
};