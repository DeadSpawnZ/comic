const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

//Settings
app.set('appName', 'Collect');
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');

//Middlewares
app.use(express.json());    //Middleware para que express reciba los json
//app.use(express.static('public'));
app.use('/static', express.static('uploads'));
app.use(cors());            //Middleware para conectar el front y el back
app.use(morgan('dev'));     //Middleware para ver las peticiones que llegan

//Routes
app.use('/users', require('./routes/users'));
app.use('/comics', ensureToken, require('./routes/comics'));
app.use('/titles', ensureToken, require('./routes/titles'));

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    console.log(bearerHeader);
    if (bearerToken !== 'null') {
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = app;