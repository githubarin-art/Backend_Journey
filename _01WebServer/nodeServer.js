const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    if(req.url === '/')
    {
        res.statusCode = 200;
        res.getHeader('Content-type','text/plain');
        res.end("Hello everyone!!");
    }
    else if(req.url === '/profile'){
        res.statusCode = 200;
        res.getHeader('Content-type','text/plain');
        res.end("Thanks for visiting on my profile !!");
    }else{
        res.statusCode = 404;
        res.getHeader('Content-type','text/plain');
        res.end("Page not Found!!");

    }
})

server.listen(port, hostname, () => {
    console.log(`Server is listening at http://${hostname}:${port}`);
})