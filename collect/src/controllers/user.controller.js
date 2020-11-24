const jwt = require('jsonwebtoken');
const userCtrl = {};

const User = require('../models/User');

/*userCtrl.getLogin = async (req, res) => {
    const users = await User.find();
    res.json(users);
};*/

userCtrl.signUp = async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
        const newUser = new User({
            username: username,
            password: await User.encryptPassword(password),
            email: email
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, 'collect', {
            expiresIn: 86400 //24 horas
        });
        res.json({ token: token, message: 'creado correctamente' });
    } else {
        res.json({ message: 'Usuario ya existe' });
    }
};

userCtrl.signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
        res.json({ message: 'Usuario no encontrado' });
    } else {
        const matchPassword = await User.matchPassword(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ token: null, message: 'Password incorrecto' })
        } else {
            const token = jwt.sign({ id: user._id }, 'collect', {
                expiresIn: 86400
            });
            res.json({ token });
        }
    }

};

userCtrl.myUser = async (req, res) => {
    const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
    const decoded = jwt.verify(bearerToken, 'collect');
    res.json({decoded});
};

module.exports = userCtrl;