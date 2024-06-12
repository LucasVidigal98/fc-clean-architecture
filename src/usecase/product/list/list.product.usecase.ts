import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductsUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map(({ id, name, price }) => ({
        id,
        name,
        price,
      }))
    }
  }
}