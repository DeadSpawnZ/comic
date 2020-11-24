const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/test' ;

//Connection to MongoDB
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
    console.log('Database is connected to', uri);
});

db.on('error', err => {
    console.log(err);
});