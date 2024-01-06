//OBS.: It is now an anonymous function (with no name)
module.exports = (temp, product) => {
// const replaceTemplate = (temp, product) => {

// This function replaces all product properties variables
// with the correct properties from JSON file with products data,
// based on the current product ID passed to here.

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