/**
 * Created by gyt-John on 2017/2/23.
 */
var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

var checkLogin = require('../middlewares/check').checkLogin;

router.get('/', function (req, res, next) {
    res.render('posts');
});
//发表一篇文章
router.post('/', checkLogin, function (req, res, next) {
    // res.send(req.flash());

    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    try {
        if (!title.length) {
            throw new Error('请填写标题');
        }
        if (!content.length) {
            throw new Error('请填写内容');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    var post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };

    PostModel.create(post)
        .then(function (result) {
            post = result.ops[0];
            req.flash('success', '发表成功');

            res.redirect(`/posts/${post._id}`);
        })
        .catch(next);
});
//发表文章页
router.post('/create', checkLogin, function (req, res, next) {
    // res.send(req.flash());

    res.render('create');
});
//单独一篇的文章页
router.get('/:postId', checkLogin, function (req, res, next) {
    res.send(req.flash());
});
//更新文章页
router.get('/:postId/edit', checkLogin, function (req, res, next) {
    res.send(req.flash());
});
//更新一篇文章
router.post('/:postId/edit', checkLogin, function (req, res, next) {
    res.send(req.flash());
});
//删除一篇文章
router.get('/:postId/remove', checkLogin, function (req, res, next) {
    res.send(req.flash());
});
//创建一条留言
router.post('/:postId/comment', checkLogin, function (req, res, next) {
    res.send(req.flash());
});
//删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function (req, res, next) {
    res.send(req.flash());
});

module.exports = router;