import ProductFactory from "../../../domain/product/factory/product.factory";
import { ListProductsUseCase } from "./list.product.usecase";

const product1 = ProductFactory.create('a', 'Product 1', 1);
const product2 = ProductFactory.create('a', 'Produto 2', 2);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test for listing customer use case", () => {
  it('Should list products', async () => {
    const productRepository = MockRepository();
    const productUseCase = new ListProductsUseCase(productRepository);


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