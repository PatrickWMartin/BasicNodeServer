const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    

    // Build file path
    let filePath = path.join(
        __dirname, 
        'public', 
        req.url === '/' ? 'index.html' : req.url
    );

    // extention of file
    let extName = path.extname(filePath);

    // initail content type
    let contentType = 'text/html'

    switch(extName){
        case '.js':
            contentType = 'text/javascript'
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json'
            break;
        case '.png':
            contentType = 'image/png'
            break;
        case '.jpg':
            contentType = 'image/jpg'
            break;
    }

    // read file
    fs.readFile(filePath, (err, data)=>{
        if(err){
            if (err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname,'public','notFound.html'), (err, data) =>{
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data, 'utf8');
                });
            }
            else{
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data, 'utf8');
        }
    });


});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log(`Server running on port ${PORT}...`)})