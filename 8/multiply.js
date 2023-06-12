class MultiplicatorUnitFailure extends Error { }

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    let ans = 0, flag = true;
    while (flag) {
        try {
            flag = false;
            ans = primitiveMultiply(a, b);
        } catch (e) {
            if (e instanceof MultiplicatorUnitFailure) {
                flag = true;
            } else {
                throw (e);
            }
        }
    }
    return ans;
}

console.log(reliableMultiply(8, 3));
// → 64