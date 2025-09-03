import path from 'node:path';
import * as fs from 'node:fs/promises';

export async function readMovies() {
  const filePath = path.join(import.meta.dirname, 'movies.json');

  const data = await fs.readFile(filePath, { encoding: 'utf-8' });

  return data;
}
