import { loadEnv } from '@videobooker/shared';
import { config as loadEnvFile } from 'dotenv';

loadEnvFile();

export function startWorkers() {
  loadEnv();
  // env vars (REDIS_URL, MONGO_URL) will be used once queue wiring is in place.
  // TODO: initialize BullMQ queues and processors once Redis wiring is available.
  return true;
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log('Worker bootstrap placeholder');
  startWorkers();
}
