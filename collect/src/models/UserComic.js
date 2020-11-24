const { Schema, model } = require('mongoose');
const types = Schema.Types;

const userSchema = new Schema({
    user: {
        type:       types.ObjectId,
        ref:        'User',
        required:   true
    },
    comic: {
        type:       types.ObjectId,
        ref:        'Comic',
        required:   true
    },
    state: {
        type:       Number
    }
}, {
    timestamps:     true
});

module.exports = model('UserComic', userSchema);