<<<<<<< HEAD


const buffer = Buffer.from('Hello Node.js');
console.log(buffer);  

// setTimeout
setTimeout(() => {
  console.log('This message is delayed by 2 seconds');
}, 2000);

//setInterval

setInterval(()=>{
    console.log('This message is logged every 3 seconds');
},3000)

// Process
console.log(`process ID: ${process.pid}`)
console.log(`process ID: ${process.version}`)

//__filename and __dirname
console.log(`Current file: ${__filename}`);
console.log(`Current directory: ${__dirname}`);

//TextEncoder and TextDecoder
const encoder = new TextEncoder();
const encoded = encoder.encode("Hello World");
=======


const buffer = Buffer.from('Hello Node.js');
console.log(buffer);  

// setTimeout
setTimeout(() => {
  console.log('This message is delayed by 2 seconds');
}, 2000);

//setInterval

setInterval(()=>{
    console.log('This message is logged every 3 seconds');
},3000)

// Process
console.log(`process ID: ${process.pid}`)
console.log(`process ID: ${process.version}`)

//__filename and __dirname
console.log(`Current file: ${__filename}`);
console.log(`Current directory: ${__dirname}`);

//TextEncoder and TextDecoder
const encoder = new TextEncoder();
const encoded = encoder.encode("Hello World");
>>>>>>> 690b7deba2c1c57bb6cb13d9db1ef6dd8c9e461f
console.log(encoded); 