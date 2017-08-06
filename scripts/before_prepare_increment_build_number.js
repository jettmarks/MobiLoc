var fs = require('fs');
var git = require('git-rev-sync')

console.log('Incrementing Build Number');


var file = fs.readFileSync('www/build/main.js', 'utf8');

var str = git.short();

console.log('short', str)

var result = file.replace(/{{GITVERSIONSTRING}}/g, str);

fs.writeFileSync('www/build/main.js', result);

console.log('Incrementing Build Number Completed');
