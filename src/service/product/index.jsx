import env from "../../config/env";
import fetch, { fmt } from "../../utils/api";

const router = {
  products: `${env.API_URL}/catalog/products`,
};

class ProductService {
  static getAll(param) {
    let uri = router.products;
    return fetch.get(uri, param);
  }
}

export default ProductService;
