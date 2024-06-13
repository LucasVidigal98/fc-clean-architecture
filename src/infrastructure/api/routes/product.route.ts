import express, { Request, Response } from "express";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../../../usecase/product/create/create.product.dto";
import { ListProductsUseCase } from "../../../usecase/product/list/list.product.usecase";


export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository());

    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type
    }

    const output = await usecase.execute(productDto);

    return res.send(output);
  } catch (err) {
    return res.status(500).send(err)
  }
});

productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductsUseCase(new ProductRepository());

    const output = await usecase.execute({});

    res.send(output);
  } catch (err) {
    return res.status(500).send(err)
  }
});
