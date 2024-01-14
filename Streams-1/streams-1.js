const fs = require('fs');
const server = require('http').createServer(); // IMPORT AND CREATING SERVER

server.on('request', (req, res) => {
  //----------------------------------------------------------------
  // Solution 1 - H O R R I B L E SOLUTION
  // IT TAKES TOO LONG FOR READING A TXT WITH 10.000 LINES
  // AND THE SITE WILL BE BUSY WITH NO ANSWER ...
  //----------------------------------------------------------------
  // 1.1-READ ENTIRE FILE AT ONCE...
  fs.readFile('test-file.txt', (err, data) => {
    if (err) console.log(err);
    // 1.2 - WRITE ENTIRE FILE AT ONCE ON THE PAGE...
    res.end(data);
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listenning...');
});
