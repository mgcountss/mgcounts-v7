const fs = require('fs');
let all = JSON.parse(fs.readFileSync('./apikeys.json'));

function apikey() {
    return all[Math.floor(Math.random() * all.length)];
}

module.exports = apikey;