import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const qrSchema = z.object({
  linkId: z.string().min(1),
});

export const qrRouter = Router();

qrRouter.post('/', validateBody(qrSchema), (req, res, next) => {
  const link = store.listLinks().find((item) => item.id === req.body.linkId);
  if (!link) {
    next(new HttpError(404, 'Link not found'));
    return;
  }
  const imageUrl = `https://cdn.videobooker.ai/qr/${link.shortCode}.png`;
  res.json({ linkId: link.id, imageUrl });
});
