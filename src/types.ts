import { Request } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndBody<T, B> = Request<T, {}, B>;

export type ProductWithoutIDFieldType = {
  title: string;
  price: number;
  count: number;
};

export type ProductType = {
  id: string;
  title: string;
  price: number;
  count: number;
};

export type DBType = {
  products: ProductType[];
};

export type DBName = "samyraiBack" | "samyraiBackTests";
