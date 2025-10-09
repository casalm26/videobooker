import express from 'express';

export function createServer() {
  const app = express();

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}

if (require.main === module) {
  const app = createServer();
  const port = process.env.PORT ?? 4000;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
