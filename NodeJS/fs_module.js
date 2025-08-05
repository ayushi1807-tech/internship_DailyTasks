<<<<<<< HEAD
const fs = require('fs');
const filename = 'content.txt';

fs.writeFileSync('content.txt', 'Hello World!');

//write file asynchronously
fs.writeFile('content.txt', 'Hello World!', (err) => {
    if (err) throw err;
    console.log('File has been written successfully!');
});



/* Write File */

// read a file 
const result = fs.readFileSync('content.txt', 'utf8');
console.log(result);



/** append Filee  */

// append a file aynchronously -- non_Blocking
fs.appendFile(filename,'This is an appended data',(err)=>{
    if(err) throw err;
    console.log('File has been appended successfully!');
})
// append a file synchronously -- Blocking
fs.appendFileSync(filename,'This is an appended data');



/****** Rename file synchronously and asynchronously *****/

// // rename file withb sync

// fs.renameSync(filename, 'newContent.txt');

// // rename file with async

// fs.rename(filename,'newContext.txt',(err)=>{
//     if(err) throw err;
//     console.log('File has been renamed successfully with Async methoddd !')
// })



/***** Delete file synchronously and asynchronously ******/

// // Delete file sync
// fs.unlinkSync(filename);
// console.log('File has been deleted successfully!');


// Delete file async
// fs.unlink(filename,(err)=>{
//     if(err) throw err;
//     console.log("file has been deletd successfully with Async method");

// })

=======
const fs = require('fs');
const filename = 'content.txt';

fs.writeFileSync('content.txt', 'Hello World!');

//write file asynchronously
fs.writeFile('content.txt', 'Hello World!', (err) => {
    if (err) throw err;
    console.log('File has been written successfully!');
});



/* Write File */

// read a file 
const result = fs.readFileSync('content.txt', 'utf8');
console.log(result);



/** append Filee  */

// append a file aynchronously -- non_Blocking
fs.appendFile(filename,'This is an appended data',(err)=>{
    if(err) throw err;
    console.log('File has been appended successfully!');
})
// append a file synchronously -- Blocking
fs.appendFileSync(filename,'This is an appended data');



/****** Rename file synchronously and asynchronously *****/

// // rename file withb sync

// fs.renameSync(filename, 'newContent.txt');

// // rename file with async

// fs.rename(filename,'newContext.txt',(err)=>{
//     if(err) throw err;
//     console.log('File has been renamed successfully with Async methoddd !')
// })



/***** Delete file synchronously and asynchronously ******/

// // Delete file sync
// fs.unlinkSync(filename);
// console.log('File has been deleted successfully!');


// Delete file async
// fs.unlink(filename,(err)=>{
//     if(err) throw err;
//     console.log("file has been deletd successfully with Async method");

// })

>>>>>>> 690b7deba2c1c57bb6cb13d9db1ef6dd8c9e461f
