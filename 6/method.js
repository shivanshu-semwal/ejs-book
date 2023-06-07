let map = { one: true, two: true, hasOwnProperty: true };

// Fix this call
console.log(Object.hasOwnProperty.call(map, "one"));
// → true
console.log(Object.prototype.hasOwnProperty.apply(map, ['two'])); // true