class Group {
    constructor() {
        this.map = new Map();
    }

    has(value) {
        if (this.map.has(value)) return true;
        else return false;
    }

    add(value) {
        if (this.map.has(value)) return;
        this.map.set(value, true);
    }

    delete(value) {
        this.map.delete(value);
    }

    static from(obj) {
        let ans = new Group();
        for (let value of obj) ans.add(value, true);
        return ans;
    }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
  // → false