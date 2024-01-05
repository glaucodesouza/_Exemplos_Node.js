const http = require('http');
const url = require('url');
const fs = require('fs');

//////////////////////////////////
//FILES
//////////////////////////////////

//////////////////////////////////
//SERVER
//////////////////////////////////

//data is MORE  efficient here because the data is read in the start of application...
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

//we don't use this in this lecture yet...but in future lectures...
const dataObj = JSON.parse(data);

//1st create server
//obs:
//it is executes each time you request from the browser to the server...
const server = http.createServer((req,res) => {
  //req: request
  //res: response
  const pathName = req.url;

  //if user writes 127.0.0.1:8000
  //or if user writes 127.0.0.1:8000/overview on the browser
  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');   

  //if user writes 127.0.0.1:8000/product on the browser
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');

  //if user writes 127.0.0.1:8000/api on the browser
  } else if (pathName === '/api') {
    
    //without this, the characteres written back to page would be wrong...
    res.writeHead(200, {'Content-type': 'application/json'}); 

    //send back to browser, the data read...as a page.
    res.end(data); 

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

//2nd start server
//you can set port to 8000 or 8080 for example...127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});