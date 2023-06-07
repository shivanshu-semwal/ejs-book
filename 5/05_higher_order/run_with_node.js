// load dependencies
require("./code/load")("code/scripts.js", "code/chapter/05_higher_order.js", "code/intro.js");

// function textScripts(text) {
//   let scripts = countBy(text, char => {
//     let script = characterScript(char.codePointAt(0));
//     return script ? script.name : "none";
//   }).filter(({name}) => name != "none");

//   let total = scripts.reduce((n, {count}) => n + count, 0);
//   if (total == 0) return "No scripts found";

//   return scripts.map(({name, count}) => {
//     return `${Math.round(count * 100 / total)}% ${name}`;
//   }).join(", ");
// }

// console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));


// function filter(array, test) {
//   let passed = [];
//   for (let element of array) {
//     if (test(element)) {
//       passed.push(element);
//     }
//   }
//   return passed;
// }

// console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]

// console.log(SCRIPTS.filter(s => s.direction == "ttb"));

// function characterCount(script) {
//   return script.ranges.reduce((count, [from, to]) => {
//     return count + (to - from);
//   }, 0);
// }

// console.log(SCRIPTS.reduce((a, b) => {
//   return characterCount(a) < characterCount(b) ? b : a;
// }));
// → {name: "Han", …}


function textScripts(text) {
  let scripts = countBy(
    text,
    char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.name : "none";
    }
  ).filter(
    ({ name }) => name != "none"
  );

  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({ name, count }) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

// → 61% Han, 22% Latin, 17% Cyrillic
// → {name: "Latin", …}