const { Schema, model } = require('mongoose');
const types = Schema.Types;

const titleSchema = new Schema({
    titlename: {
        type:       String,
        required:   true,
        unique:     true
    },
    editorial: {
        type:       String,
        required:   true
    },
    country: {
        type:       String,
        required:   true
    }
    /*,
    colaboration: {
        type:       types.ObjectId,
        required:   true
    }*/
},{
    timestamps:     true
});

module.exports = model('Title', titleSchema);