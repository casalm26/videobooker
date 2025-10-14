import cors from 'cors';
import express from 'express';

import { errorHandler } from './lib/error-handler';
import { notFoundHandler } from './lib/not-found';
import { analyticsRouter } from './modules/analytics/analytics.router';
import { bookingsRouter } from './modules/bookings/bookings.router';
import { brandKitRouter } from './modules/brand-kit/brand-kit.router';
import { businessRouter } from './modules/business/business.router';
import { conversationsRouter } from './modules/conversations/conversations.router';
import { healthRouter } from './modules/health/health.router';
import { integrationsRouter } from './modules/integrations/integrations.router';
import { linksRouter } from './modules/links/links.router';
import { offersRouter } from './modules/offers/offers.router';
import { publishJobsRouter } from './modules/publish-jobs/publish-jobs.router';
import { qrRouter } from './modules/qr/qr.router';
import { renderJobsRouter } from './modules/render-jobs/render-jobs.router';
import { scheduleRouter } from './modules/schedule/schedule.router';
import { servicesRouter } from './modules/services/services.router';
import { videoProjectsRouter } from './modules/video-projects/video-projects.router';

export function createServer() {
  const app = express();

  app.use((_, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
  app.use(cors());
  app.use(express.json());
  app.use((req, _res, next) => {
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.path}`);
    next();
  });

  app.use('/health', healthRouter);
  app.use('/business', businessRouter);
  app.use('/services', servicesRouter);
  app.use('/integrations', integrationsRouter);
  app.use('/brand-kit', brandKitRouter);
  app.use('/offers', offersRouter);
  app.use('/video-projects', videoProjectsRouter);
  app.use('/render-jobs', renderJobsRouter);
  app.use('/publish-jobs', publishJobsRouter);
  app.use('/schedule', scheduleRouter);
  app.use('/links', linksRouter);
  app.use('/qr', qrRouter);
  app.use('/bookings', bookingsRouter);
  app.use('/conversations', conversationsRouter);
  app.use('/analytics', analyticsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
