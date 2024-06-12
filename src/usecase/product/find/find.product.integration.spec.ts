import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";
import { InputFindProductDto } from "./find.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe('Test find product integration use case', () => {
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

  it('Should be find a product', async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new FindProductUseCase(productRepository);

    const productDb = ProductFactory.create('a', 'Produto 1', 20);

    await ProductModel.create({
      id: productDb.id,
      price: productDb.price,
      name: productDb.name
    });

    const input: InputFindProductDto = {
      id: productDb.id
    };

    const output = {
      id: productDb.id,
      name: 'Produto 1',
      price: 20
    };

    const result = await productUseCase.execute(input);

    expect(result).toEqual(output);
  });
});
