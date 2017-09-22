/**
 * Created by gyt-John on 2017/2/24.
 */
var User = require('../lib/mongo').User;

module.exports = {
    create: function create(user) {
        return User.create(user).exec();
    },

    getUserByName: function getUserByName(name) {
        return User
            .findOne({ name: name })
            .addCreateAt()
            .exec();
    }
};