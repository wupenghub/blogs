var express = require('express');
var router = express.Router();
var User = require('./models/user');
var md5 = require('blueimp-md5');
router.get('/', function (req, res) {
    res.render('index.html', req.session.user);
});
router.get('/login', function (req, res) {
    res.render('login.html');
});
router.post('/login', function (req, res, next) {
    console.log(md5(md5(req.body.pwd) + 'wupeng'));
    User.findOne({email: req.body.email, pwd: md5(md5(req.body.pwd) + 'wupeng')}, function (err, content) {
        if (err) {
            return res.next(err);
        }
        if (!content) {
            return res.status(200).json({
                status: 2,
                message: '还未进行注册'
            })
        }
        return res.status(200).json({
            status: 0,
            message: '登录成功'
        })
    });
});
router.get('/register', function (req, res) {
    res.render('register.html');
});
router.post('/register', function (req, res, next) {
    req.body.pwd = md5(md5(req.body.pwd) + 'wupeng');
    var user = req.body;
    User.findOne({'$or': [{email: user.email}, {nikeName: user.nikeName}]}, function (err, content) {//根据具体查询条件进行查询，返回一个对象
        if (err) {
            return res.next(err);
        }
        if (content) {
            return res.status(200).json({
                status: 2,
                message: '用户名或昵称已存在'
            })
        }
        //如果没有找到，开始执行注册操作
        var registerUser = new User(user);
        registerUser.save(function (err, content) {
            if (err) {
                return res.status(500).json({
                    status: 1,
                    message: '服务器繁忙，请稍后再试'
                });
            }
            if (content) {
                //注册成功，将user对象保存在服务端session中
                req.session.user = user;
                return res.status(200).json({
                    status: 0,
                    message: '注册成功！'
                });

            }
        });
    });
});
module.exports = router;