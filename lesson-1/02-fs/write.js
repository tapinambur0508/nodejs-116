const fs = require('node:fs/promises');

fs.writeFile('write.txt', 'Hello World')
  .then(() => console.log('OK'))
  .catch((error) => console.error(error));
