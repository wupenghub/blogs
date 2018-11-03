//加载mongoose插件
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    nikeName: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    modified_time: {
        type: Date,
        default: Date.now,
        required: true
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png',
        required: true
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2],
        required: true
    },
    gender: {
        type: Number,
        default: -1,
        enum: [-1, 0, 1],
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date
    }
});

module.exports = mongoose.model('User', userSchema);