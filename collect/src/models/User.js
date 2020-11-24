const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const types = Schema.Types;

const userSchema = new Schema({
    username: {
        type:       String,
        maxlength:  16,
        match:      /^[A-Za-z0-9]{1,16}$/,
        unique:     true,
        required:   true
    },
    password: {
        type:       String,
        required:   true
    },
    email: {
        type:       String,
        match:      /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,
        unique:     true,
        required:   true
    },
    pic: {
        type:       String,    
    }
}, {
    timestamps:     true
});

userSchema.statics.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.matchPassword = async (password, passwordS) => {
    return await bcrypt.compare(password, passwordS);
}

module.exports = model('User', userSchema);