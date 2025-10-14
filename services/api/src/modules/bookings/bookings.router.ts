import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const createBookingSchema = z.object({
  serviceId: z.string().min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  startsAt: z.string().min(1),
  status: z.enum(['scheduled', 'completed', 'canceled', 'no_show']).default('scheduled'),
  source: z.enum(['video', 'dm', 'link']).default('video'),
  provider: z.enum(['calendly', 'acuity']),
});

const updateBookingSchema = createBookingSchema.partial();

export const bookingsRouter = Router();

bookingsRouter.get('/', (_req, res) => {
  res.json(store.listBookings());
});

bookingsRouter.post('/', validateBody(createBookingSchema), (req, res) => {
  const booking = store.createBooking(req.body);
  res.status(201).json(booking);
});

bookingsRouter.patch('/:id', validateBody(updateBookingSchema), (req, res, next) => {
  const booking = store.updateBooking(req.params.id, req.body);
  if (!booking) {
    next(new HttpError(404, 'Booking not found'));
    return;
  }
  res.json(booking);
});
