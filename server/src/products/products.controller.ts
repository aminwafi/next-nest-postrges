import { Controller, Get, Post, Put, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findByQuery(@Query('productCode') productCode: string, @Query('location') location: string) {
    return this.productsService.findByQuery(productCode, location);
  }

  @Put()
  updateByProductCode(@Query('productCode') productCode: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateByProductCode(productCode, updateProductDto);
  }

  @Delete()
  removeByProductCode(@Query('productCode') productCode: string) {
    return this.productsService.removeByProductCode(productCode);
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
