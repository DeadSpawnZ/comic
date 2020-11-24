const { Schema, model } = require('mongoose');
const types = Schema.Types;

const comicSchema = new Schema({
    no: {
        type:       String,
        required:   true
    },
    variant: {
        type:       String,
        required:   false
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
    cover: {
        type:       String
    },
    titleid: {
        type:       types.ObjectId,
        required:   true,
        ref:        'Title'
    }
},{
    timestamps:     true
});

module.exports = model('Comic', comicSchema);