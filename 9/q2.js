let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/\b'(.*)'\b/g, '"$1"'));
// → "I'm the cook," he said, "it's my job."