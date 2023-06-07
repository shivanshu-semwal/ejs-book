class Group {
    constructor() {
        this.arr = new Array();
    }

    has(value) {
        return this.arr.includes(value);
    }

    add(value) {
        if (!this.has(value)) this.arr.push(value);
    }

    delete(value) {
        const index = this.arr.indexOf(value);
        if (index > -1) this.arr.splice(index, 1);
    }

    static from(obj) {
        let ans = new Group();
        for (let value of obj) ans.add(value, true);
        return ans;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this)
    };
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.idx = 0;
    }

    next() {
        if (this.idx == this.group.arr.length) return { done: true };
        let value = {
            value: this.group.arr[this.idx],
            done: false
        }
        this.idx += 1;
        return value;
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}

// → a
// → b
// → c