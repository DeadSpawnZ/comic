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
    status: {
        type:       String,
        enum:       ['want','have'],
        required:   true
    },
    quality: {
        type:       Number,
        default:    0
    }
}, {
    timestamps:     true
});

module.exports = model('UserComic', userSchema);