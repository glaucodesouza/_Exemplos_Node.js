// console.log(arguments);
// console.log(require("module").wrapper);

// module exports
// Exemple 1
const C = require('./test-module-2');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// Exemple 2
const calc3 = require('./test-module-3');
console.log(calc3.multiply(2, 5));

// creating variables importing from the test-modules-3.js
// Exemple 3
const { add, multiply, divide } = require('./test-module-3');
console.log(multiply(2, 5));

// Exemple 4 - CACHING
// Calling the function directly with require
require('./test-module-4.js')();
require('./test-module-4.js')();
require('./test-module-4.js')();
