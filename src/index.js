import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

<<<<<<< HEAD
initMongoConnection().then(() => {
  setupServer();
});
=======
const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Bootstrap error:', error);
  }
};

bootstrap();
>>>>>>> ed566f0da9a624dcaca0fa21a5f2808b0ffb3cde
