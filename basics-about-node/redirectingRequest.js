//To show different data on different URL
const http = require('http');
const fs = require("fs")

const server = http.createServer((req, res) => {

    //Parse the URL
    const url = req.url;
    const method = req.method;

    console.log("Request URL", req.url)
    if(url === '/'){
        res.write('<html>')
        res.write('<head>Enter Message</head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        fs.writeFileSync('message.txt', 'Dummy Data');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>Heyda! This is the message</head>')
    res.write('</html>')
    res.end();
});

server.listen(8000);