import mongoose from 'mongoose';

import { getEnvVariable } from './utils/getEnvVariable.js';

const URI = getEnvVariable('DB_URI');

async function initDBConnection() {
  await mongoose.connect(URI);
}

export { initDBConnection };
