const fs = require('node:fs/promises');

fs.appendFile('write.txt', 'Hello Node.js\n')
  .then(() => console.log('OK'))
  .catch((error) => console.error(error));
