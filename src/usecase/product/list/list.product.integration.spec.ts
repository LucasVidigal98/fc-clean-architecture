import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductsUseCase } from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product1 = ProductFactory.create('a', 'Product 1', 1);
const product2 = ProductFactory.create('a', 'Produto 2', 2);

describe('Test list products integration use case', () => {
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


  it('should be able to list products', async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new ListProductsUseCase(productRepository);

    await ProductModel.create({ id: product1.id, name: product1.name, price: product1.price });
    await ProductModel.create({ id: product2.id, name: product2.name, price: product2.price });

    const result = await productUseCase.execute({});

    expect(result.products).toHaveLength(2);
    expect(result.products[0].price).toBe(product1.price);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].id).toBe(product1.id);

    expect(result.products[1].price).toBe(product2.price);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].id).toBe(product2.id);
  });
});