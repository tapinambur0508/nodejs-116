import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs/promises';

export function readMovies() {
  // console.log(import.meta);

  // Works in Node.js v < 22
  // const dirname = path.dirname(fileURLToPath(import.meta.url));

  // Works in Node.js v >= 22
  const dirname = import.meta.dirname;
  const filePath = path.join(dirname, 'movies.txt');

  // const filePath = path.resolve("movies", "movies.txt");

  return fs.readFile(filePath, { encoding: 'utf-8' });
}
