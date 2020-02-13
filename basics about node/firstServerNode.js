const http = require('http');

//This method is itself a server
const server = http.createServer((req, res) => {
    //Event loop will always run indefinitely and so continue running as long as there are event listeners
    console.log("Request Url",req.url)
    console.log("Request Method",req.method)
    console.log("Request Headers",req.headers)

    //Send a Response
    res.setHeader('Content-Type', 'text/html')
    res.write('<html><head>My First Page</head></html>')
    res.end();
    // //TO stop event loop and to quit this process and to stop the server
    // process.exit();
});

server.listen(8000);