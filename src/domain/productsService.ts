import { ProductWithoutIDFieldType, ProductType } from "../types";
import { productsRepository } from "../repositories/productsRepository";

export const productsService = {
  async findProducts(title: string | null): Promise<ProductType[]> {
    return productsRepository.findProducts(title);
  },
  async findProductByID(id: string): Promise<ProductType | null> {
    return await productsRepository.findProductByID(id);
  },
  async createProduct(
    product: ProductWithoutIDFieldType
  ): Promise<ProductType> {
    const { title, price, count } = product;
    const newProduct = {
      id: `${+new Date()}`,
      title: `${title}`,
      price: price,
      count: count,
    };
    return await productsRepository.createProduct(newProduct);
  },
  async changeProductByID(
    id: string,
    changeParams: ProductWithoutIDFieldType
  ): Promise<ProductType | null> {
    return await productsRepository.changeProductByID(id, changeParams);
  },
  async deleteProductByID(id: string): Promise<Boolean> {
    return await productsRepository.deleteProductByID(id);
  },
};
