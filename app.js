var express = require('express');
var app = express();
var router = require('./router');
//配置express-art-template
app.engine('html', require('express-art-template'))
//加载mongoose插件
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
app.listen(3000, function () {
    console.log('running...')
});
app.use('/public/', express.static('./public/'));
app.use('/node_modules/', express.static('./node_modules/'));
app.use(router);