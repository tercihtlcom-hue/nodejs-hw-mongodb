import fs from 'node:fs';
import path from 'node:path';
import createHttpError from 'http-errors';

export const swaggerDocs = () => {
  try {
    const swaggerPath = path.join(process.cwd(), 'docs', 'swagger.json');
    const swaggerContent = fs.readFileSync(swaggerPath, 'utf-8');
    return JSON.parse(swaggerContent);
  } catch {
    throw createHttpError(
      500,
      'Failed to load docs, please run "npm run build-docs" first',
    );
  }
};
