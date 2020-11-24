const fs = require('fs');
/*
fs.writeFile('./texto.txt', 'linea uno', function (err){
    if(err){
        console.log(err);
    }else{
        console.log('Archivo creado');
    }
});

console.log('ultima linea de codigo');
*/

fs.readFile('./texto.txt', function (err, data){
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});