import { Router } from 'express';
import { z } from 'zod';

import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const linkSchema = z.object({
  label: z.string().min(1),
  targetUrl: z.string().url(),
  shortCode: z.string().min(3),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const linksRouter = Router();

linksRouter.get('/', (_req, res) => {
  res.json(store.listLinks());
});

linksRouter.post('/', validateBody(linkSchema), (req, res) => {
  const link = store.createLink(req.body);
  res.status(201).json(link);
});
