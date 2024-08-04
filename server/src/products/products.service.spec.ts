import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOneBy: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            save: jest.fn()
          },
        }
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product))
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  // describe('create', () => {
  //   it('should create a product', async () => {
  //     const createProductDto: CreateProductDto = { productCode: 'T000-create', location: 'East Malaysia', price: 100, productDescription: 'test product: T000' };
  //     jest.spyOn(repository, 'create').mockResolvedValue(createProductDto);

  //     const result = await service.create(createProductDto);
  //     expect(result).toEqual(createProductDto);
  //     expect(repository.create).toHaveBeenCalledWith(createProductDto);
  //   })
  // });

  describe('findByQuery', () => {
    it('should return product with matching productCode', async () => {
      const result = [{ id: 4, productCode: '1000', location: 'West Malaysia', price: 300, productDescription: 'test now' }];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findByQuery('T000-create', 'East Malaysia')).toBe(result);
    });
  });

  describe('updateByProductCode', () => {
    it('should update product with matching productCode', async () => {
      const updateProductDto: UpdateProductDto = { location: 'West Malaysia', price: 200 };
      const result = { id: 4, productCode: '1000', location: 'West Malaysia', price: 300, productDescription: 'test now' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...result, ...updateProductDto })
      
      expect(await service.updateByProductCode('1000', updateProductDto)).toEqual({
        ...result,
        ...updateProductDto
      });
    });
  });

  describe('removeByProductCode', () => {
    it('should delete product with matching productCode', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

      await expect(service.removeByProductCode('1000')).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith('1000');
    });
  });
});
