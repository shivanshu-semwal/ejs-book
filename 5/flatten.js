let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.

flatarr = arrays.reduce((arr, flatarr) => arr.concat(flatarr), [])
console.log(flatarr)
// → [1, 2, 3, 4, 5, 6]

