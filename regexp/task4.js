let str = "'Hello World!' it's not, it isn't";
let task1 = str.replace(/'/g, '"');
let task2 = str.replace(/(?!\b)'/g, '"');
let div = document.querySelector('.result').innerHTML = `First task: ${task1}, <br> Second task: ${task2}`;