const os = require('os');

console.log(os.platform());
console.log(os.release());
console.log('free mem: ', os.freemem()/1024/1024/1024, ' Giga Bytes');
console.log('total mem: ', os.totalmem()/1024/1024/1024, ' Giga Bytes');