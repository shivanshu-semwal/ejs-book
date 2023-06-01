function range(start, end, step=1) {
    let arr = []
    for (let i = start; ; i += step) {
        arr.push(i);
        if (i == end) break;
    }
    return arr;
}

function sum(arr) {
    let sum = 0;
    arr.forEach(x => sum += x)
    return sum;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55