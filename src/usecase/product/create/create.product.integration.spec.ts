import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";
import { InputCreateProductDto } from "./create.product.dto";

describe('Test create product integration use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it('should be able to create a product', async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new CreateProductUseCase(productRepository);

    const input: InputCreateProductDto = {
      name: 'Produto 1',
      price: 10,
      type: 'a'
    }

    const output = {
      id: expect.any(String),
      name: 'Produto 1',
      price: 10,
    }

    const result = await productUseCase.execute(input);

    expect(result).toEqual(output);

    const prductModel = await ProductModel.findOne({ where: { id: result.id } });

    expect(prductModel).toBeTruthy();
  });
});