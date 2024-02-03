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

//----------------------------------------------------------------
//New code
//----------------------------------------------------------------
//Async function, which returns a promise
//cleaner and easier to understand than the OLD code.
//this is async but have synchronous calling inside it
//so the 3 calling inside it, are executed one after the end of the other.
const getDocPic = async () => {
  try {
    //await: call synchronously this function as a promise
    const data = await readFilePro(`${__dirname}/dog.txt`); //this is a promise, called synchronously
    console.log(`Breed, ${data}`);

    //await: call synchronously this function as a promise
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //returns a Promise
    console.log(res.body.message);

    //await: call synchronously this function as a promise
    //returns a promise, waiting for it to write
    //no need here to create a variable in this case
    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (error) {
    console.log(error);
  }
};

//call this async function
//this is async but have synchronous calling inside it
//so the 3 calling inside it, are executed one after the end of the other.
getDocPic();

//----------------------------------------------------------------
// Older code
//----------------------------------------------------------------
// here we call our custom function which will return a promise
// in data parameter
// CHAIN
/*
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
*/
