import {IComponentRoutes} from '../../types/common';
import {Router} from 'express';
import {ProductController} from './controller';
import Joi from 'joi';
import validator, {ExpressJoiInstance} from 'express-joi-validation';
import errorHandler from '../../middlewares/errorHandler';

export class ProductRoutes implements IComponentRoutes<ProductController> {
  readonly controller: ProductController = new ProductController();
  readonly router: Router = Router();
  readonly validator: ExpressJoiInstance = validator.createValidator({
    passError: true,
  });

  readonly getProductRoute: string = '/';

  constructor() {
    this.initRoutes();
    this.registerPostMiddleware();
  }

  initRoutes(): void {
    this.router.get(
      this.getProductRoute,
      this.validator.query(GetProductsTypeJoi),
      this.controller.getProduct
    );
  }

  registerPostMiddleware(): void {
    this.router.use(errorHandler);
  }
}

const GetProductsTypeJoi = Joi.object({
  startsWith: Joi.string().length(1),
});
