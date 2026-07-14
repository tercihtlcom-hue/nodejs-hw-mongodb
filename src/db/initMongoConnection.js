import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const connectionString = getEnvVar('MONGODB_URL');

    await mongoose.connect(connectionString);

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.error('Mongo connection error:', e.message);
    throw e;
  }
};
