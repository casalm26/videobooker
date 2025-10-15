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
  const integration = store.updateIntegration(parseResult.data.provider, {
    status: 'connected',
    ...(parseResult.data.provider === 'meta'
      ? {
          pages: ['Demo Fitness IG', 'Demo Fitness FB'],
          sandboxMode: true,
        }
      : parseResult.data.provider === 'calendly' || parseResult.data.provider === 'acuity'
        ? {
            eventTypes: ['Intro Class', 'Consultation'],
          }
        : {}),
  });
  res.json({ integration, metadata: req.body.metadata ?? null });
});

integrationsRouter.post('/:provider/disconnect', (req, res, next) => {
  const parseResult = providerParamSchema.safeParse(req.params);
  if (!parseResult.success) {
    next(new HttpError(400, 'Unsupported integration provider'));
    return;
  }
  const integration = store.updateIntegration(parseResult.data.provider, { status: 'disconnected' });
  res.json({ integration });
});

integrationsRouter.get('/availability', validateQuery(availabilityQuery), (req, res) => {
  const { provider, date } = req.query as z.infer<typeof availabilityQuery>;
  const slots = store.listAvailability(provider, date);
  res.json({ provider, date, slots });
});

const updateIntegrationSchema = z.object({
  status: z.enum(['connected', 'needs_attention', 'disconnected']).optional(),
  sandboxMode: z.boolean().optional(),
  pages: z.array(z.string()).optional(),
  eventTypes: z.array(z.string()).optional(),
});

integrationsRouter.patch('/:provider', validateBody(updateIntegrationSchema), (req, res, next) => {
  const parseResult = providerParamSchema.safeParse(req.params);
  if (!parseResult.success) {
    next(new HttpError(400, 'Unsupported integration provider'));
    return;
  }
  const integration = store.updateIntegration(parseResult.data.provider, req.body);
  res.json({ integration });
});
