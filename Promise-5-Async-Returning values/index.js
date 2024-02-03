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
//Async function, which returns a promise
//----------------------------------------------------------------
//but has some synchronous calling inside it
//so the 3 calling inside it, are executed one after the end of the other.
const getDogPic = async () => {
  try {
    //await: call synchronously this function as a promise
    const data = await readFilePro(`${__dirname}/dog.txt`); //this is a promise, called synchronously
    console.log(` Breed, ${data}`);

    //await: call synchronously this function as a promise
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //returns a Promise
    console.log(` ` + res.body.message);

    //await: call synchronously this function as a promise
    //returns a promise, waiting for it to write
    //no need here to create a variable in this case
    await writeFilePro('dog-img.txt', res.body.message);
    console.log(` Random dog image saved to file!`);
  } catch (error) {
    console.log(error);
    throw error;
  }
  return '2: ready 🐶';
};

(async () => {
  try {
    console.log('1: Will get doc pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done!');
  } catch (error) {
    console.log(`ERROR 💥`);
  }
})();

/*
//OLD code
//call this async function (have some synchronous callings inside)
console.log('1: Will get doc pics!');
getDocPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done!');
  })
  .catch((err) => {
    console.log(`ERROR 💥`);
  });
// console.log('2: Done!');
*/
