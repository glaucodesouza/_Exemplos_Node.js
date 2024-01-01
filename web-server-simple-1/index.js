const http = require('http');

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
  console.log(req);
  res.end('Hello from the server!'); 
});

//starting the server...
//you can set port to 8000 or 8080 for example...
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});