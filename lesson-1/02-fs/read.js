const fs = require('node:fs/promises');

fs.readFile('read.txt', { encoding: 'utf-8' })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
