const fs = require("fs")

const requestHandler = (req,res) => {

    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>')
        res.write('<head>Enter Message</head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            const firstWord = message.split('+')[0];
            fs.writeFile(firstWord+'.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>Heyda! This is the message</head>')
    res.write('</html>')
    res.end();
}

// To export this module
// method 1:-
module.exports = {
    handler: requestHandler,
    someText: 'Some hard Coded text'
}