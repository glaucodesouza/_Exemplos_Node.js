const fs = require('fs');
const server = require('http').createServer(); // IMPORT AND CREATING SERVER
const { pipeline, finished } = require('stream');
server.on('request', (req, res) => {
  //----------------------------------------------------------------
  // Solution 2
  // USING STREAM to read file contents
  // IMPORTANT:
  //  NEED both events to it to work correctly:
  //    res.write
  //    and res.end
  //----------------------------------------------------------------
  // 2.1 - Creates a stream...to READ FILE in parts ...
  const readable = fs.createReadStream('test-file.txt');
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  readable.on('data', (chunk) => {
    if (!res.write(chunk)) {
      console.log('backpressure');
      readable.pause();
    } else {
      // 2.2 - Then, writes parts of file contents to PAGE...
      res.write(chunk);
    }
  });
  readable.on('end', () => {
    res.end(); // when end of response ...
  });
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found');
  });
  res.on('drain', () => {
    console.log('drained');
    readable.resume();
  });

  finished(readable, (err) => {
    if (err) {
      console.error('Stream failed', err);
    } else {
      console.log('Stream is done reading');
    }
  });
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listenning...');
});
