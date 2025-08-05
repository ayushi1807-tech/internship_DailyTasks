const os = require('os')

console.log('Operating System:', os.type());
console.log('OS Version:', os.version());
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Information:', os.cpus());
console.log('Free Memory:', os.freemem(), 'bytes');
console.log('User Information:',os.userInfo());
console.log('Total MemoryL', os.totalmem(), 'bytes');
console.log("Uptime:", os.uptime(), 'seconds');
console.log(" HostName:",os.hostname());
console.log("temporary Directory:", os.tmpdir());
console.log("Network InterFaces:",os.networkInterfaces());
console.log("Release:",os.release());

