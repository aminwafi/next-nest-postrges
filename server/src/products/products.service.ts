import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
    // return 'This action adds a new product';
  }

  async findByQuery(productCode: string, location: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: { productCode, location },
    });
  }

  async updateByProductCode(productCode: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ productCode });
    
    if (!product) {
      throw new NotFoundException('Product code not found');
    }

    this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async removeByProductCode(productCode: string): Promise<void> {
    const result = await this.productsRepository.delete({ productCode });

    if (result.affected === 0) {
      throw new NotFoundException('Product code not found');
    }
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
    // return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
