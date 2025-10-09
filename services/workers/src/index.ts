export function startWorkers() {
  // TODO: initialize BullMQ queues and processors once Redis wiring is available.
  return true;
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log('Worker bootstrap placeholder');
  startWorkers();
}
