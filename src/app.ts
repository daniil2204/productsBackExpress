import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import { productsRouter } from "./routes/products";

export const app = express();

app.use(bodyParser({}));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!");
});

app.use("/products", productsRouter);
app.use("/testData", productsRouter);
