import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDto } from "./update.product.dto";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create('a', 'Produto 1', 14);

const input: InputUpdateProductDto = {
  id: product.id,
  name: 'Prod Update',
  price: 20
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it('should update a product', async () => {
    const productRepository = MockRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const output = {
      id: product.id,
      name: 'Prod Update',
      price: 20
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});