//To show different data on different URL
const http = require('http');

const server = http.createServer((req, res) => {

    //Parse the URL
    const url = req.url;
    console.log("Request URL", req.url)
    if(url === "/"){
        res.write('<html>')
        res.write('<head>Enter Message</head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    else if(url === "/parth"){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head>Heyda! This is the Parth</head>')
        res.write('</html>')
        res.end();
    }
    else{
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head>Heyda! This is the message</head>')
        res.write('</html>')
        res.end();
    }
});

server.listen(8000);