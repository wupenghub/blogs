var express = require('express');
var app = express();
var router = require('./router');
var session = require('express-session');
//配置express-art-template
app.engine('html', require('express-art-template'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(3000, function () {
    console.log('running...');
});
app.set('trust proxy', 1);// trust first proxy
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}));
app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));
app.use(router);
app.use(function (req, res) {
    res.end('404');
});
app.use(function (error, req, res, next) {
    return res.status(500).json({
        status: 1,
        message: '服务器繁忙，请稍后再试'
    })
});