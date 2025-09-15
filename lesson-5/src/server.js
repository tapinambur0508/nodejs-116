import 'dotenv/config';

import app from './app.js';
import { initDBConnection } from './db.js';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  try {
    await initDBConnection();

    app.listen(8080, (error) => {
      if (error) {
        throw error;
      }

      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap().catch((error) => console.error(error));
