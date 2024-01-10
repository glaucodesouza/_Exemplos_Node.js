const fs = require('fs');
const crypto = require('crypto');

const start = Date.now(); //get date in miliseconds

//set environment THREAD quantity variable to just 1
//No more 4 threads for paralel processing
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log(Date.now() - start, 'Timer 1 finished'), 0); //zero seconds
setImmediate(() => console.log(Date.now() - start, 'Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('----------------------------------------------------------------');
  console.log('I/O finished');

  setTimeout(() => console.log(Date.now() - start, 'Timer 2 finished'), 0); //zero seconds
  setTimeout(() => console.log(Date.now() - start, 'Timer 3 finished'), 3000); //3000 miliseconds = 3 seconds
  setImmediate(() => console.log(Date.now() - start, 'Immediate 2 finished'));

  process.nextTick(() => console.log(Date.now() - start, 'Process.nextTick'));

  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, `miliseconds... Password encrypted`);
  });
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, `miliseconds... Password encrypted`);
  });
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, `miliseconds... Password encrypted`);
  });
  crypto.pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, `miliseconds... Password encrypted`);
  });
});

console.log('Hello from the top-level code');
