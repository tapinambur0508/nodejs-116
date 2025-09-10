import mongoose from 'mongoose';

const URI = process.env.DB_URI;

async function initDBConnection() {
  await mongoose.connect(URI);
}

export { initDBConnection };
