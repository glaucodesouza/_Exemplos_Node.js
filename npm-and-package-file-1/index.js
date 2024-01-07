const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate')

//////////////////////////////////
//FILES
////////////////////////////////// 
























//////////////////////////////////
//SERVER
//////////////////////////////////


// const replaceTemplate = (temp, product) => {

//   // /g meaning of replacing all products in one pass...as a loop
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   // OBS.: 
//   // not-organic is a CSS class in template-product.html
//   if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  
//   output = output.replace(/{%IMAGE%}/g, product.image);

//   return output; //return the replaced HTML
// }

// Templates
const tempOverview  = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard      = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct   = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

//data is MORE  efficient here because the data is read in the start of application...
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

// Initially read as JSON with 5 object (the products)
const dataObj = JSON.parse(data);

// 1st create server
// obs:
// it is executes each time you request from the browser to the server...
const server = http.createServer((req, res) => {
  // req: request
  // res: response
  
  // console.log(req.url);
  // console.log(url.parse(req.url, true)); //true = pass query part from url like: ?id=0
  // const pathName = req.url;
  const { query, pathname } = url.parse(req.url, true);
  
  //---------------------------------------------------
  // Overview Page
  //---------------------------------------------------
  // if user writes 127.0.0.1:8000
  // or if user writes 127.0.0.1:8000/overview on the browser
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {'Content-type': 'text/html'});
    
    // here replaceTemplate(tempCard, el) is returned by the arrow function
    // thus, no need for curly braces
    //--THIS function replaces an entire LOOP for replace a template of cards for products
    //--This function returns an ARRAY with products with HTML formatting.
    //--THIS function returns an HTML for the user...
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    // console.log(cardsHtml);

    res.end(output);
    // res.end(tempOverview);

  //---------------------------------------------------
  // Product Page
  //---------------------------------------------------
  // if user writes 127.0.0.1:8000/product on the browser
  } else if (pathname === '/product') {
    res.writeHead(200, {'Content-type': 'text/html'});
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    // console.log(query);
    // res.end('This is the PRODUCT');
  
  //---------------------------------------------------
  // API
  //---------------------------------------------------
  // if user writes 127.0.0.1:8000/api on the browser
  } else if (pathname === '/api') {
    
    //without this, the characteres written back to page would be wrong...
    res.writeHead(200, {'Content-type': 'application/json'}); 

    //send back to browser, the data read...as a page.
    res.end(data); 

  //---------------------------------------------------
  // Not Found
  //---------------------------------------------------
  } else {
    //setting Header before the response
    res.writeHead(404, {
      'Content-type':'text/html',
      'my-own-header':'hello-world'
    });
    //response
    res.end('<h1>Page not found!</h1>');
  }
});

//2nd start server
//you can set port to 8000 or 8080 for example...127.0.0.1:8000
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});