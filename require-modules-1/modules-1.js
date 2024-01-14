// console.log(arguments);
// console.log(require("module").wrapper);

const C = require('./test-module-2');
const calc1 = new C();
console.log(calc1.add(2, 5));

const calc3 = require('./test-module-3');
console.log(calc3.multiply(2, 5));
