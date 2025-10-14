import { Router } from 'express';
import { z } from 'zod';

import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const serviceSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  durationMinutes: z.number().int().positive(),
  price: z.number().nonnegative(),
  isActive: z.boolean(),
});

export const servicesRouter = Router();

servicesRouter.get('/', (_req, res) => {
  res.json(store.listServices());
});

servicesRouter.put('/', validateBody(z.object({ services: z.array(serviceSchema) })), (req, res) => {
  const updated = store.replaceServices(req.body.services);
  res.json(updated);
});
