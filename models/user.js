const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    
    userRank: {
        type: Number,
        required: true
    },

    userScore: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);