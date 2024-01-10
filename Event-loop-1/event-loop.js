const fs = require('fs');

setTimeout(() => console.log('Timer 1 finished'), 0); //zero seconds
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('----------------------------------------------------------------');

  setTimeout(() => console.log('Timer 2 finished'), 0); //zero seconds
  setTimeout(() => console.log('Timer 3 finished'), 3000); //3000 miliseconds = 3 seconds
  setImmediate(() => console.log('Immediate 2 finished'));
});

console.log('Hello from the top-level code');
