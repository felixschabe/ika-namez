import {NotFoundRoutes} from './notFound/routes';
import {Router} from 'express';
import {ProductRoutes} from './product/routes';

export function registerRoutes(router: Router): void {
  const apiPrefix = '/v1';
  router.use(`${apiPrefix}/product`, new ProductRoutes().router);
  router.get('*', new NotFoundRoutes().router);
}
