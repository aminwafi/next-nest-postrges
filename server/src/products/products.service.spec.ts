import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

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
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            merge: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
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

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = { productCode: '1000', location: 'West Malaysia', price: 300, productDescription: 'test now' };
      const result: Product  = { id: 4, ...createProductDto };
      jest.spyOn(repository, 'create').mockReturnValue({ ...createProductDto, id: undefined } as Product);
      jest.spyOn(repository, 'save').mockResolvedValue(result);

      const createdProduct = await service.create(createProductDto);
      expect(createdProduct).toEqual(result);
      expect(repository.save).toHaveBeenCalledWith(createProductDto);
    })
  });

  describe('findByQuery', () => {
    it('should return product with matching productCode', async () => {
      const result = [{ id: 4, productCode: '1000', location: 'West Malaysia', price: 300, productDescription: 'test now' }];
      jest.spyOn(repository, 'find').mockResolvedValue(result);

      expect(await service.findByQuery('1000', 'West Malaysia')).toBe(result);
    });
  });

  describe('updateByProductCode', () => {
    it('should update product with matching productCode', async () => { 
      const updateProductDto: UpdateProductDto = { location: 'Eest Malaysia', price: 400 };
      const currentProduct: Product = {
        id: 4,
        productCode: '1000',
        location: 'West Malaysia',
        price: 300,
        productDescription: 'test now'
      };

      const result: Product = {
        ...currentProduct,
        ...updateProductDto
      }

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(currentProduct);
      jest.spyOn(repository, 'merge').mockImplementation((product, updateDto) => Object.assign(product, updateDto));
      jest.spyOn(repository, 'save').mockResolvedValue({ ...result, ...updateProductDto });
      
      expect(await service.updateByProductCode('1000', updateProductDto)).toEqual(result);
      expect(repository.findOneBy).toHaveBeenCalledWith({ productCode: '1000' });
      expect(repository.merge).toHaveBeenCalledWith(currentProduct, updateProductDto);
      expect(repository.save).toHaveBeenCalledWith(currentProduct);

    });
  });

  describe('removeByProductCode', () => {
    it('should delete product with matching productCode', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} } as DeleteResult);

      await expect(service.removeByProductCode('1000')).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith({'productCode': '1000'});
    });
  });
});
