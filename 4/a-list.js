function arrayToList(arr, index = 0) {
    if (index == arr.length) return null;
    return {
        value: arr[index],
        rest: arrayToList(arr, index + 1)
    };
}

function listToArray(list) {
    let arr = [];
    while (list != null) {
        arr.push(list.value);
        list = list.rest;
    }
    return arr;
}

function prepend(no, list) {
    return {
        value: no,
        rest: list
    };
}

function nth(list, no) {
    for (let i = 0; i < no; i++) {
        list = list.rest;
    }
    return list.value;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20