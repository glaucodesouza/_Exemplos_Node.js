const http = require('http');
const url = require('url');

//////////////////////////////////
//FILES
//////////////////////////////////


//////////////////////////////////
//SERVER
//////////////////////////////////

//1st create server
//2nd start server
const server = http.createServer((req,res) => {
  //req: request
  //res: response
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');    
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');
  } else {
    //setting Header before the response
    res.writeHead(404, {
      'Content-type':'text/html',
      'my-own-header':'hello-world'
    });
    //response
    res.end('<h1>Page not found!</h1>');
  }
});

//starting the server...
//you can set port to 8000 or 8080 for example...
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});