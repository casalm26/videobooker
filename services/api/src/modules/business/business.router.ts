import { Router } from 'express';
import { z } from 'zod';

import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const updateBusinessSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  hours: z.string().min(1).optional(),
  website: z.string().url().optional(),
  socialLinks: z
    .object({
      instagram: z.string().url().optional(),
      facebook: z.string().url().optional(),
      tiktok: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .partial()
    .optional(),
  onboardingCompletedSteps: z.array(z.string()).optional(),
});

export const businessRouter = Router();

businessRouter.get('/', (_req, res) => {
  res.json(store.getBusiness());
});

businessRouter.put('/', validateBody(updateBusinessSchema), (req, res) => {
  const updated = store.updateBusiness(req.body);
  res.json(updated);
});
