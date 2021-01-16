import { Router } from 'express';
import SubscriptionController from './controllers/SubscriptionController';

const routes = Router();

routes.get('/subscribe', SubscriptionController.index);
routes.post('/subscribe', SubscriptionController.create);

export default routes;
