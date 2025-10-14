import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody, validateQuery } from '../../lib/validation';

const providerParamSchema = z.object({
  provider: z.enum(['meta', 'calendly', 'acuity']),
});

const connectSchema = z.object({
  metadata: z.record(z.unknown()).optional(),
});

const availabilityQuery = z.object({
  provider: z.enum(['calendly', 'acuity']),
  date: z.string().default(new Date().toISOString()),
});

export const integrationsRouter = Router();

integrationsRouter.get('/', (_req, res) => {
  res.json(store.listIntegrations());
});

integrationsRouter.post('/:provider/connect', validateBody(connectSchema), (req, res, next) => {
  const parseResult = providerParamSchema.safeParse(req.params);
  if (!parseResult.success) {
    next(new HttpError(400, 'Unsupported integration provider'));
    return;
  }
  const integration = store.updateIntegration(parseResult.data.provider, 'connected');
  res.json({ integration, metadata: req.body.metadata ?? null });
});

integrationsRouter.post('/:provider/disconnect', (req, res, next) => {
  const parseResult = providerParamSchema.safeParse(req.params);
  if (!parseResult.success) {
    next(new HttpError(400, 'Unsupported integration provider'));
    return;
  }
  const integration = store.updateIntegration(parseResult.data.provider, 'disconnected');
  res.json({ integration });
});

integrationsRouter.get('/availability', validateQuery(availabilityQuery), (req, res) => {
  const { provider, date } = req.query as z.infer<typeof availabilityQuery>;
  const slots = store.listAvailability(provider, date);
  res.json({ provider, date, slots });
});
