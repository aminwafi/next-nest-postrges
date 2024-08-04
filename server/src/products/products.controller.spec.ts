import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findByQuery: jest.fn().mockResolvedValue([]),
            updateByProductCode: jest.fn().mockResolvedValue({}),
            removeByProductCode: jest.fn().mockResolvedValue(undefined)
          }
        }
      ],
    }).compile();

    controller  = module.get<ProductsController>(ProductsController);
    service     = module.get<ProductsService>(ProductsService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('create', () => {
    it('should create a product', async () => {
      const dto: CreateProductDto = { productCode: 'T000-create', location: 'East Malaysia', price: 100, productDescription: 'test product: T000' };
      await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
    })
  });

  describe('findByQuery', () => {
    it('should return product with matching productCode', async () => {
      const result = [{ id: 1, productCode: 'T000-create', location: 'East Malaysia', price: 100, productDescription: null }];
      jest.spyOn(service, 'findByQuery').mockResolvedValue(result);

      expect(await controller.findByQuery('T000-create', 'East Malaysia')).toBe(result);
    });
  });

  describe('updateByProductCode', () => {
    it('should update product with matching productCode', async () => {
      const updateProductDto: UpdateProductDto = { location: 'West Malaysia', price: 200 };
      const result = { id: 1, productCode: 'T000-create', location: 'East Malaysia', price: 100, productDescription: null };
      jest.spyOn(service, 'updateByProductCode').mockResolvedValue(result);
      
      expect(await controller.updateByProductCode('T000-create', updateProductDto)).toBe(result);
    });
  });

  // describe('removeByProductCode', () => {
  //   it('should delete product with matching productCode', async () => {
  //     jest.spyOn(service, 'removeByProductCode').mockResolvedValue({ affected: 1 });

  //     expect(await controller.removeByProductCode('T000-create')).toBe(result);
  //   });
  // });
});
