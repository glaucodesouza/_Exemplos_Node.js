const fs = require('fs');

//Blocking code execution (Synchronous)
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Create a new file with a text concatenated
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');
