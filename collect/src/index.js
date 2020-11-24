require('dotenv').config({path:__dirname+'../../.env'});
const app = require('./app.js');
require('./connection.js');

async function main(){
    await app.listen(app.get('port'));
    await console.log(app.get('appName'));
    console.log('App on port', app.get('port'));
}

main();