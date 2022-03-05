import {readFileSync} from 'fs';
import {bind} from 'decko';

export class ProductRepository {
  @bind
  async getProducts(): Promise<any> {
    const productsJson: any = JSON.parse(
      await readFileSync(__dirname + '/../../../output/ikeaProducts.json', {
        encoding: 'utf8',
        flag: 'r',
      })
    );

    return productsJson;
  }
}
