import { Router } from 'express';
import { z } from 'zod';

import { HttpError } from '../../lib/http-error';
import { store } from '../../lib/store';
import { validateBody } from '../../lib/validation';

const messageSchema = z.object({
  sender: z.enum(['prospect', 'assistant', 'staff']),
  body: z.string().min(1),
  intent: z.enum(['price', 'availability', 'hours', 'location', 'other']).optional(),
});

export const conversationsRouter = Router();

conversationsRouter.get('/', (_req, res) => {
  res.json(store.listConversations());
});

conversationsRouter.get('/:id', (req, res, next) => {
  const conversation = store.getConversation(req.params.id);
  if (!conversation) {
    next(new HttpError(404, 'Conversation not found'));
    return;
  }
  res.json(conversation);
});

conversationsRouter.post('/:id/messages', validateBody(messageSchema), (req, res, next) => {
  const conversation = store.addMessage(req.params.id, req.body);
  if (!conversation) {
    next(new HttpError(404, 'Conversation not found'));
    return;
  }
  res.status(201).json(conversation);
});
