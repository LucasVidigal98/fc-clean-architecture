import Product from "../../../domain/product/entity/product";
import { InputFindProductDto } from "./find.product.dto";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product('123', 'Produto 1', 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test find product use case', () => {
  it('Should be find a product', async () => {
    const productRepository = MockRepository();
    const productUseCase = new FindProductUseCase(productRepository);

    const input: InputFindProductDto = {
      id: '123'
    };

    const output = {
      id: '123',
      name: 'Produto 1',
      price: 10
    }

    const result = await productUseCase.execute(input);

    expect(result).toEqual(output);
  });
});