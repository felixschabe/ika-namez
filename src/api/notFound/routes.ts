import {IComponentRoutes} from '../../types/common';
import {NotFoundController} from './controller';
import {Router} from 'express';

export class NotFoundRoutes implements IComponentRoutes<NotFoundController> {
  readonly controller: NotFoundController = new NotFoundController();
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.all('*', this.controller.getNotFoundMessage);
  }
}
