const fs = require('fs');
const server = require('http').createServer(); // IMPORT AND CREATING SERVER
const { pipeline, finished } = require('stream');
server.on('request', (req, res) => {
  //----------------------------------------------------------------
  // Solution 3 - Using PIPE operator
  //----------------------------------------------------------------
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  // readableSource.pipe(writeableDest);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listenning...');
});
