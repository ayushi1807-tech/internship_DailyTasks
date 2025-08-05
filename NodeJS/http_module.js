const http = require('http');
const port = 3000;

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write("<h1>Welcome to the Home Page!</h1>");
        res.end();
    } else if(req.url === '/about'){
        res.write("Welcome to the About Page!");
        res.end();
    } 
});
server.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});