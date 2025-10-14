import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store, VideoVariation } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const variationSchema: z.ZodType<VideoVariation> = z.object({
  id: z.string().optional(),
  format: z.enum(['9x16', '1x1', '16x9']),
  durationSeconds: z.number().positive(),
  captionStyle: z.enum(['burned-in', 'none']),
  thumbnailUrl: z.string().url(),
});

const createProjectSchema = z.object({
  concept: z.string().min(1),
  vertical: z.string().min(1),
  offerId: z.string().optional(),
  variations: z.array(variationSchema).optional(),
});

const updateProjectSchema = z.object({
  status: z.enum(['draft', 'ready', 'archived']).optional(),
  offerId: z.string().optional(),
});

export const videoProjectsRouter = Router();

videoProjectsRouter.get('/', (_req, res) => {
  res.json(store.listProjects());
});

videoProjectsRouter.get('/:id', (req, res, next) => {
  const project = store.getProject(req.params.id);
  if (!project) {
    next(new HttpError(404, 'Video project not found'));
    return;
  }
  res.json(project);
});

videoProjectsRouter.post('/', validateBody(createProjectSchema), (req, res) => {
  const project = store.createProject(req.body);
  res.status(201).json(project);
});

videoProjectsRouter.patch('/:id', validateBody(updateProjectSchema), (req, res, next) => {
  const project = store.getProject(req.params.id);
  if (!project) {
    next(new HttpError(404, 'Video project not found'));
    return;
  }
  Object.assign(project, req.body);
  res.json(project);
});
