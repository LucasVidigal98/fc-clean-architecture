import { InputCreateProductDto } from "./create.product.dto";
import { CreateProductUseCase } from "./create.product.usecase";

const input1: InputCreateProductDto = {
  name: 'Produto 1',
  price: 10,
  type: 'a'
}

const input2: InputCreateProductDto = {
  name: 'Produto 2',
  price: 10,
  type: 'b'
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test create product use case', () => {
  it('should create a product a', async () => {
    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);

    const output = await productUseCase.execute(input1);

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Produto 1',
      price: 10
    });
  });

  it('should create a product b', async () => {
    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);

    const output = await productUseCase.execute(input2);

    expect(output).toEqual({
      id: expect.any(String),
      name: 'Produto 2',
      price: 20
    })
  });

  it("should thrown an error when name is missing", async () => {
    const inputTest = { ...input1 };

    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);

    inputTest.name = '';

    await expect(productUseCase.execute(inputTest)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is not must be greater than zero", async () => {
    const inputTest = { ...input1 };

    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);

    inputTest.price = -1;

    await expect(productUseCase.execute(inputTest)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
})