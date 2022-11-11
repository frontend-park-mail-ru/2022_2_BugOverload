const glob = require('glob');
const fs = require('fs');

const cachedUrl = [
    glob.sync('./dist/**/**.*'),
].flat(Infinity)
    .map((url) => url
        .replace('sw.js', '/')
        .replace('./dist/', ''));

const content = fs.readFileSync('./src/sw.js');
let contentString = String(content);
contentString = contentString.replace('[]', `['${cachedUrl.join('\',\'')}']`);
fs.writeFileSync('./dist/sw.js', contentString);
