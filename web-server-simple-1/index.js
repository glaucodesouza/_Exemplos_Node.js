const fs = require('fs');
const http = require('http');

//////////////////////////////////
//FILES

// //Blocking code execution (Synchronous way)
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// // Create a new file with a text concatenated
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

//Non-blocking, asynchronous read/write, in sequence call.
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3) => {
//       console.log(data3);
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written ! 😄');
//       });
//     });
//   });
// });
// console.log('Will read file!');

//////////////////////////////////
//SERVER
//1st create server
//2nd start server
http.createServer((req,res) => {
  res.end('Hello from the server!');
});