
import { ProductMongoDao } from "../db/mongo/ProductMongoDao.js";

class ProductManager {
  constructor() {
    this.dao = new ProductMongoDao();
  }

  async find(params) {
    return await this.dao.find(params);
  }

  async findById(id) {
    return await this.dao.findById(id);
  }

  async create(product) {
    return await this.dao.create(product);
  }

  async update(id, product) {
    return await this.dao.update(id, product);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }
}

export default ProductManager;
