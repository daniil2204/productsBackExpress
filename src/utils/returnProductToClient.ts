import { ProductType } from "../types";
import { ProductViewModel } from "../models";

export const returnProductToClient = (
  product: ProductType
): ProductViewModel => {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
  };
};
