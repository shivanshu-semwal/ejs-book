// load dependencies
require("./code/load")
    ("code/scripts.js", "code/chapter/05_higher_order.js", "code/intro.js");

function dominantDirection(text) {
    let directions = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({ name }) => name != "none");

    console.log(directions)

    return directions.reduce((max_direction, direction) =>
        max_direction.count < direction.count ? direction : max_direction,
        { name: "none", count: 0 }
    ).name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
console.log(dominantDirection(""));