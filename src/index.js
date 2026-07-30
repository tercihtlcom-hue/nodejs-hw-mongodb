import 'dotenv/config'; // MUTLAKA EN ÜSTTE OLMALI!
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Bootstrap error:', error);
  }
};

bootstrap();
