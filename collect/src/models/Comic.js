const { Schema, model } = require('mongoose');
const types = Schema.Types;

const comicSchema = new Schema({
    no: {
        type:       String,
        required:   true
    },
    print:{
        type:       Number,
        required:   true       
    },
    type: {
        type:       String,
        required:   true
    },
    price: {
        type:       Number,
        required:   true
    },
    date: {
        type:       Date,
        required:   true
    },
    cover: {
        type:       String
    },
    variant: {
        type:       String
    },
    title: {
        type:       types.ObjectId,
        ref:        'Title',
        required:   true
    },
    user: {
        type:       types.ObjectId,
        ref:        'User',
        required:   true
    }
},{
    timestamps:     true
});

module.exports = model('Comic', comicSchema);