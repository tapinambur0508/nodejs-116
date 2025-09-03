import path from 'node:path';
import * as fs from 'node:fs/promises';

export async function writeMovies(array) {
  const filePath = path.join(import.meta.dirname, 'movies.json');

  await fs.writeFile(filePath, JSON.stringify(array));
}
