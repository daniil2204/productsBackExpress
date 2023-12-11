import { ProductWithoutIDFieldType, ProductType } from "../types";
import { productCollection } from "../db/connectToDB";

export const productsRepository = {
  async findProducts(title: string | null): Promise<ProductType[]> {
    if (title) {
      return productCollection.find({ title: { $regex: title } }).toArray();
    } else {
      return productCollection.find().toArray();
    }
  },
  async findProductByID(id: string): Promise<ProductType | null> {
    const product = await productCollection.findOne({ id: id });
    if (product) {
      return product;
    } else {
      return null;
    }
  },
  async createProduct(newProduct: ProductType): Promise<ProductType> {
    await productCollection.insertOne(newProduct);
    return newProduct;
  },
  async changeProductByID(
    id: string,
    changeParams: ProductWithoutIDFieldType
  ): Promise<ProductType | null> {
    const { title, count, price } = changeParams;
    const product = await productCollection.updateOne(
      { id: id },
      { $set: { title, price, count } }
    );
    return product.matchedCount === 1 ? { ...changeParams, id } : null;
  },
  async deleteProductByID(id: string): Promise<Boolean> {
    return (await productCollection.deleteOne({ id: id })).deletedCount === 1;
  },
};
