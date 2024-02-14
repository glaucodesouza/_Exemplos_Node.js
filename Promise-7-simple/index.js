const promise1 = 1 === 2 ? Promise.resolve(123) : Promise.reject(111);
const promise2 = Promise.resolve(2);
promise1
  .then((value) => {
    console.log(value);
  })
  .catch((value) => {
    console.log(value);
  });
promise2.then((value) => {
  console.log(value);
});
