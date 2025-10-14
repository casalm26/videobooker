import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const baseSchema = z.object({
  projectId: z.string().min(1),
  publishAt: z.string(),
  platforms: z.array(z.enum(['instagram', 'facebook', 'tiktok', 'youtube'])).min(1),
  status: z.enum(['scheduled', 'published', 'failed']).optional(),
});

const updateSchema = baseSchema.partial();

export const scheduleRouter = Router();

scheduleRouter.get('/', (_req, res) => {
  res.json(store.listSchedule());
});

scheduleRouter.post('/', validateBody(baseSchema), (req, res, next) => {
  const project = store.getProject(req.body.projectId);
  if (!project) {
    next(new HttpError(404, 'Video project not found'));
    return;
  }
  const entry = store.createScheduleEntry(req.body);
  res.status(201).json(entry);
});

scheduleRouter.put('/:id', validateBody(updateSchema), (req, res, next) => {
  const entry = store.updateScheduleEntry(req.params.id, req.body);
  if (!entry) {
    next(new HttpError(404, 'Schedule entry not found'));
    return;
  }
  res.json(entry);
});

scheduleRouter.delete('/:id', (req, res, next) => {
  const removed = store.deleteScheduleEntry(req.params.id);
  if (!removed) {
    next(new HttpError(404, 'Schedule entry not found'));
    return;
  }
  res.status(204).send();
});
