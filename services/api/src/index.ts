import { loadEnv } from '@videobooker/shared';
import { config as loadEnvFile } from 'dotenv';

import { createServer } from './app';

loadEnvFile();

if (require.main === module) {
  const env = loadEnv();
  const app = createServer();
  const port = env.PORT;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}

export { createServer } from './app';
