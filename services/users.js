const Users = require("../models/users");
const bcrypt = require('bcrypt');

module.exports = class UserService {
    async create(details) {
        const pass = await bcrypt.hash(details.password, 5)
        details['password'] = pass
        return await Users.query().insert(details);
    }

    async findAll(txn) {
        const users = await Users.query(txn);
        console.log(users, "txn users")
        return users;
    }

    async findById(userId) {
        const user = await Users.query().findById(userId);
        if (user === undefined) {
            return ({ "Sorry": `User id ${userId} not found` })
        }
        return user;
    }

    async UpdateById(id, user_update) {
        const upp = await Users.query().update(user_update).where('id', id);
        return upp
    }

    async deleteById(userId) {
        const del = await Users.query().deleteById(userId);
        return del
    }

    async emailChecking(email) {
        const userDetails = await Users.query().findOne({
            email: email
        })
        return userDetails;
    }

    async PassChecking(userInfo, Pass) {
        return await bcrypt.compare(Pass, userInfo.password)
    }
};