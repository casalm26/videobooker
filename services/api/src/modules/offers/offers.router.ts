import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const offerPayloadSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  callToAction: z.string().min(1),
  price: z.number().nonnegative().optional(),
  active: z.boolean().default(true),
});

const updateOfferSchema = offerPayloadSchema.partial();

export const offersRouter = Router();

offersRouter.get('/', (_req, res) => {
  res.json(store.listOffers());
});

offersRouter.post('/', validateBody(offerPayloadSchema), (req, res) => {
  const offer = store.createOffer(req.body);
  res.status(201).json(offer);
});

offersRouter.put('/:id', validateBody(updateOfferSchema), (req, res, next) => {
  const offer = store.updateOffer(req.params.id, req.body);
  if (!offer) {
    next(new HttpError(404, 'Offer not found'));
    return;
  }
  res.json(offer);
});

offersRouter.delete('/:id', (req, res, next) => {
  const removed = store.deleteOffer(req.params.id);
  if (!removed) {
    next(new HttpError(404, 'Offer not found'));
    return;
  }
  res.status(204).send();
});
