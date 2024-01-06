//---------------------------------------------------------------------------
Course:
  Node.js, Express, MongoDB & More: The Complete Bootcamp 2024  
Class from UDEMY Course

Instrutor
Jonas Schmedtmann
Web Developer, Designer, and Teacher
//---------------------------------------------------------------------------

to run, use this command: 
  node index.js
//---------------------------------------------------------------------------

Our own modules (module.exports)
  Module 2, video 17
  https://deloittedevelopment.udemy.com/course/nodejs-express-mongodb-bootcamp/learn/lecture/15080944

//---------------------------------------------------------------------------
  words
    module.exports = (temp, product) => {
    require('./modules/replaceTemplate')

  Whats the difference between import, export and require ?

    The major difference between require and import, is that require will automatically scan node_modules to find modules, but import, which comes from ES6, won't.

    Apart from that,

    You can't selectively load only the pieces you need with require but with import, you can selectively load only the pieces you need, which can save memory.

    Loading is synchronous(step by step) for require on the other hand import can be asynchronous(without waiting for previous import) so it can perform a little better than require.

  You can also see answer here:
    https://stackoverflow.com/questions/46677752/the-difference-between-requirex-and-import-x/46677972#:~:text=The%20major%20difference%20between%20require,from%20ES6%2C%20won't.&text=js'%20notes%2C%20import%20won',the%20path%20of%20the%20module.

//OBS.: It is now an anonymous function (with no name)
module.exports = (temp, product) => {

  // /g meaning of replacing all products in one pass...as a loop
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  // OBS.: 
  // not-organic is a CSS class in template-product.html
  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  
  output = output.replace(/{%IMAGE%}/g, product.image);

  return output; //return the replaced HTML
}