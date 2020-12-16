const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    noticeTitle: {
        type: String,
        required: true
    },
    noticeBody: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = Notice;