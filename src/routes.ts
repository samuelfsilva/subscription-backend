import { Router } from 'express';
import SubscriptionController from './controllers/SubscriptionController';

const routes = Router();

routes.get('/data/subscribe', SubscriptionController.index);
routes.post('/data/subscribe', SubscriptionController.create);

export default routes;
