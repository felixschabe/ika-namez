import { ProductRepository } from "./repository";
import { bind } from "decko";
import { Request, Response } from "express";
import { getRandom } from "../../services/random";
import { createDefaultApiResponse } from "../../utils/utils";

export class ProductController {
  readonly repo: ProductRepository = new ProductRepository();

  @bind
  async getProduct(req: Request, res: Response): Promise<Request | void> {
    let productsJson = await this.repo.getProducts();
    const startsWith = req.query.startsWith;

    if (startsWith) {
      productsJson = productsJson.filter((product: any) =>
        product.name.toUpperCase().startsWith((startsWith + "").toUpperCase())
      );
    }

    if (productsJson.length <= 0) {
      return createDefaultApiResponse(res, true, "nothing found", 404);
    }

    const random: number = await getRandom(productsJson.length - 1);
    productsJson[random].apiData = {
      random: random,
      results: productsJson.length,
    };

    res.json(productsJson[random]).status(200);
  }
}
