const path = require('path')
const filename = 'example.txt'
const pathname = path.join(__dirname,filename)

console.log('Path to the file:', pathname)
console.log('Directory name:', path.dirname(pathname))
console.log('Base name of the file:', path.basename(pathname))
console.log('File extension:', path.extname(pathname)) 
console.log("resolve filePath:",path.resolve(pathname))

/*The path.parse() method in Node.js's Path Module is used to return an 
 object representing the significant components of a file path. It breaks 
 own the path into its root, directory, base, name, and extension.*/

const parsePath = path.parse(pathname)
console.log('Parsed path:', parsePath)
