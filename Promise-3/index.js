//---------------------------------------------------------------------
//CHAINED PROMISES - EXAMPLE 3
//---------------------------------------------------------------------
const fs = require('fs');

const superagent = require('superagent');

//our new custom function which returns a promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find a file 😥');
      resolve(data); //will return labrador
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I could not write to the file 😥');
      resolve('success');
    });
  });
};

// here we call our custom function which will return a promise
// in data parameter
// CHAIN
readFilePro(`${__dirname}/dog.txt`) //this is a promise
  .then((data) => {
    //here is a callback ...
    console.log(`Breed, ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //return a Promise
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message); //return a promise
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    //this is the error for the promise of readFilePro...
    console.log('RETURNED error of promise: ', err); // returned message here would be: could not find a file
  });

//----------------------------------------------------------------
// OLD WAY OF DOING IT ...
// WE will make it as above, chaining the promises....
//----------------------------------------------------------------
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
// //here is a callback ...
// console.log(`Breed, ${data}`);

// superagent
//   //................................................................
//   // CALLING PROMISE here ...
//   //................................................................
//   .get(`https://dog.ceo/api/breed/${data}/images/random`)

//   //................................................................
//   // SUCCESSFUL RETURNING OF PROMISE ...
//   //................................................................
//   .then((res) => {
//     //here is another callback ...
//     console.log('RETURNING Success of promise:', res.body);

//     fs.writeFile('dog-img.txt', res.body.message, (err) => {
//       //here is another callback...
//       console.log('Random dog image saved to file!');
//     });
//   })

//   //................................................................
//   // ERROR RETURNING OF PROMISE...
//   //................................................................
//   .catch((err) => {
//     console.log('RETURNED error of promise: ', err.message);
//   });
// });
