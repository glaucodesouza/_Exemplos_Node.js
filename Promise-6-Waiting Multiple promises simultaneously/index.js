//----------------------------------------------------------------
//Waiting for Multiple Promises Simultaneously
//----------------------------------------------------------------
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

    // Save promise in a variable
    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //returns a Promise

    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //returns a Promise

    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`); //returns a Promise

    //----------------------------------------------------------------
    //Waiting for Multiple Promises Simultaneously
    //----------------------------------------------------------------
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n')); // separetes images by ENTER caracter
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
