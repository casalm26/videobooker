import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const createRenderJobSchema = z.object({
  projectId: z.string().min(1),
  format: z.enum(['9x16', '1x1', '16x9']),
  etaSeconds: z.number().int().positive().default(120),
});

const updateStatusSchema = z.object({
  status: z.enum(['queued', 'processing', 'completed', 'failed']),
  progress: z.number().min(0).max(100).optional(),
  assetUrl: z.string().url().optional(),
  errorMessage: z.string().optional(),
});

export const renderJobsRouter = Router();

renderJobsRouter.get('/', (_req, res) => {
  res.json(store.listRenderJobs());
});

renderJobsRouter.post('/', validateBody(createRenderJobSchema), (req, res, next) => {
  const project = store.getProject(req.body.projectId);
  if (!project) {
    next(new HttpError(404, 'Video project not found'));
    return;
  }
  const job = store.createRenderJob({
    projectId: project.id,
    format: req.body.format,
    etaSeconds: req.body.etaSeconds,
  });
  res.status(201).json(job);
});

renderJobsRouter.get('/:id', (req, res, next) => {
  const job = store.getRenderJob(req.params.id);
  if (!job) {
    next(new HttpError(404, 'Render job not found'));
    return;
  }
  res.json(job);
});

renderJobsRouter.patch('/:id', validateBody(updateStatusSchema), (req, res, next) => {
  const job = store.updateRenderJobStatus(req.params.id, req.body.status, req.body);
  if (!job) {
    next(new HttpError(404, 'Render job not found'));
    return;
  }
  res.json(job);
});
