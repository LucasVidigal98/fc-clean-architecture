import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";

const product = ProductFactory.create('a', 'Produto 1', 14);

const input: InputUpdateProductDto = {
  id: product.id,
  name: 'Prod Update',
  price: 20
};

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

  it('should be able to update a product', async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    await ProductModel.create({ id: product.id, name: product.name, price: product.price });

    const output = {
      id: product.id,
      name: 'Prod Update',
      price: 20
    };


    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});