import { Router } from 'express';
import { z } from 'zod';

import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const updateBrandKitSchema = z.object({
  primaryColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/).optional(),
  secondaryColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/).optional(),
  accentColor: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/).optional(),
  fontFamily: z.string().min(1).optional(),
  logoUrl: z.string().url().optional(),
  subtitleStyle: z.enum(['light', 'dark']).optional(),
});

export const brandKitRouter = Router();

brandKitRouter.get('/', (_req, res) => {
  res.json(store.getBrandKit());
});

brandKitRouter.put('/', validateBody(updateBrandKitSchema), (req, res) => {
  const kit = store.updateBrandKit(req.body);
  res.json(kit);
});
