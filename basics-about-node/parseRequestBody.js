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
        const body = [];
        //Create event listener. For createserver event listener is created by node itself
        //on() methods allow us to listen to events. First parameter is type of event. Data event is fired whenever buffer is ready. Second argument is that function which has to nbe executed
        req.on('data', (chunk) => {
            // console.log("Chunk ",chunk)
            body.push(chunk);
            // console.log("Body ", body)
        });
        //Another event is to be fired once it completes parsing request. That event is end.
        return req.on('end', () => {
            //To interact with the chunks or streams we need to buffer
            const parsedBody = Buffer.concat(body).toString();
            console.log("Parsed Body ", parsedBody)
            const message = parsedBody.split('=')[1];
            console.log("Message", message)
            const firstWord = message.split('+')[0];
            // name of file is the first letter of the message and message is whole message
            //writefilesync() blocks the code execution before execution of this function. For large files this is not recommended. Use writefile()
            // fs.writeFileSync(firstWord+'.txt', message)
            //Third argument is registration of event listener
            fs.writeFile(firstWord+'.txt', message)
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
        //If response does matter than do not put this here
        // res.statusCode = 302;
        // res.setHeader('Location', '/');
        // return res.end();
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>Heyda! This is the message</head>')
    res.write('</html>')
    res.end();
});

server.listen(8000);