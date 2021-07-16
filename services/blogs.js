const Blogs = require("../models/blogs");

module.exports = class BlogService {
    async createblog(blog) {
        return await Blogs.query().insert(blog);
    };
    async findAll(blogs) {
        return await Blogs.query(blogs);
    };

    async findById(blogId) {
        const blog = await Blogs.query().findById(blogId);
        if (blog === undefined) {
            return ({ "Sorry": `BlogId ${userId} not found` })
        }
        return blog
    };

    async UpdateById(id, blo_gdata) {
        const upblog = await Blogs.query().update(blo_gdata).where("id", id);
        return upblog
    };

    async deleteById(blogId) {
        return await Blogs.query().deleteById(blogId);
    };

};