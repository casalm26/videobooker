import { loadEnv } from '@videobooker/shared';
import { config as loadEnvFile } from 'dotenv';
import express from 'express';

loadEnvFile();

export function createServer() {
  const app = express();

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}

if (require.main === module) {
  const env = loadEnv();
  const app = createServer();
  const port = env.PORT;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
