/**
 * Created by gyt-John on 2017/2/23.
 */
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//登录页
router.get('/', function (req, res, next) {
    // res.send(req.flash());
    var author = req.query.author;

    PostModel.getPosts(author)
        .then(function (posts) {
            res.render('posts', {
                posts: posts
            });
        })
        .catch(next);
});

//用户登陆
router.post('/', checkNotLogin, function (req, res, next) {
    // res.send(req.flash());
    var name = req.fields.name;
    var password = req.fields.password;

    UserModel.getUserByName(name)
        .then(function (user) {
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('back');
            }

            if (sha1(password) !== user.password) {
                req.flash('error', '用户名或密码错误');
                return res.redirect('back');
            }
            req.flash('success', '登录成功');

            delete user.password;
            req.session.user = user;

            res.redirect('/post');
        })
        .catch(next);
});

module.exports = router;