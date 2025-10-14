import { Router } from 'express';
import { z } from 'zod';

import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const updateAnalyticsSchema = z.object({
  period: z.enum(['7d', '30d']).optional(),
  totals: z
    .object({
      videosPublished: z.number().nonnegative().optional(),
      views: z.number().nonnegative().optional(),
      clicks: z.number().nonnegative().optional(),
      dmStarts: z.number().nonnegative().optional(),
      bookings: z.number().nonnegative().optional(),
      conversionRate: z.number().nonnegative().optional(),
    })
    .partial()
    .optional(),
  topVideos: z
    .array(
      z.object({
        projectId: z.string().min(1),
        title: z.string().min(1),
        views: z.number().nonnegative(),
        bookings: z.number().nonnegative(),
      }),
    )
    .optional(),
});

export const analyticsRouter = Router();

analyticsRouter.get('/overview', (_req, res) => {
  res.json(store.getAnalytics());
});

analyticsRouter.patch('/overview', validateBody(updateAnalyticsSchema), (req, res) => {
  const analytics = store.updateAnalytics(req.body);
  res.json(analytics);
});
