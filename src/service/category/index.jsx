import env from "../../config/env";
import fetch, { fmt } from "../../utils/api";

const router = {
  categories: `${env.API_URL}/catalog/categories`,
  productsByCategory: `${env.API_URL}/catalog/category/{category}/products`,
};

class CategoryService {
  static getAll() {
    let uri = router.categories;
    return fetch.get(uri);
  }
  static getProductsByCategory(param, category) {
    let uri = fmt(router.productsByCategory, { category });
    return fetch.get(uri, param);
  }
}

export default CategoryService;
