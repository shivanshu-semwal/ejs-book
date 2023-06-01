function deepEqual(obj1, obj2) {
    if (typeof (obj1) != typeof (obj2)) return false;
    if (typeof (obj1) != typeof ({})) return obj1 == obj2;

    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);

    if (keys1.length < keys2.length)
        return deepEqual(obj2, obj1)

    for (key of keys1) {
        if (key in obj2) return deepEqual(obj1[key], obj2[key]);
        else return false;
    }
    return true;
}

obj = { here: { is: "an" }, object: 2 };

console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
  // → true

