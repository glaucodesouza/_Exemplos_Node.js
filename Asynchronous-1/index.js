//Callback problem
const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  //here is an callback ...
  console.log(`Breed, ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      //here is another callback ...

      if (err) {
        return console.log(err.message);
      }
      console.log(res.body);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        //here is another callback...
        console.log('Random dog image saved to file!');
      });
    });
});
