/**
 * Created by gyt-John on 2017/2/24.
 */
var config = require('config-lite');
var Mongolass = require('mongolass');
var monent = require('monent');
var objectIdToTimeStamp = requre('object-to-timestamp');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: {type: 'string'},
    password: {type: 'string'},
    avatar: {type: 'string'},
    gender: {type: 'string', enum: ['m', 'f', 'x']},
    bio: {type: 'string'}
});

exports.Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    content: {type: 'string'},
    pv: {type: 'number'}
});

exports.Post.index({author: 1, _id: -1}).exec();

mongolass.plugin('addCreateAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.create_at = monent(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.cteate_at = monent(objectIdToTimeStamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});

exports.User.index({name: 1}, {unique: true}).exec();