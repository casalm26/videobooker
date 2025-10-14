import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const createPublishJobSchema = z.object({
  projectId: z.string().min(1),
  platform: z.enum(['instagram', 'facebook', 'tiktok', 'youtube']),
  caption: z.string().min(1),
  scheduledFor: z.string().optional(),
});

export const publishJobsRouter = Router();

publishJobsRouter.post('/', validateBody(createPublishJobSchema), (req, res, next) => {
  const project = store.getProject(req.body.projectId);
  if (!project) {
    next(new HttpError(404, 'Video project not found'));
    return;
  }
  const job = store.createPublishJob({
    projectId: project.id,
    platform: req.body.platform,
    caption: req.body.caption,
    scheduledFor: req.body.scheduledFor,
  });
  res.status(201).json(job);
});

publishJobsRouter.get('/:id', (req, res, next) => {
  const job = store.getPublishJob(req.params.id);
  if (!job) {
    next(new HttpError(404, 'Publish job not found'));
    return;
  }
  res.json(job);
});
