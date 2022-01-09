import { ProductRepository } from "./repository";
import { bind } from "decko";
import { Request, Response } from "express";
import { getRandom } from "../../services/random";

export class ProductController {
  readonly repo: ProductRepository = new ProductRepository();

  @bind
  async getProduct(req: Request, res: Response): Promise<Request | void> {
    const productsJson = await this.repo.getProducts();
    const startsWith = req.query.startsWith;

    if (startsWith) {
      const startsWithProducts = productsJson.filter((product: any) =>
        product.name.toUpperCase().startsWith((startsWith + "").toUpperCase())
      );
      const random = await getRandom(startsWithProducts.length);
      res.json(startsWithProducts[random]).status(200);
      return;
    }

    const random: number = await getRandom(productsJson.length);
    console.log(random);

    res.json(productsJson[random]).status(200);
  }
}
