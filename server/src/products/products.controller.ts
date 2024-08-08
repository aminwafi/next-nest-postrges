import { Controller, Get, Post, Put, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user', 'admin')
  findByQuery(@Query('productCode') productCode: string, @Query('location') location: string) {
    return this.productsService.findByQuery(productCode, location);
  }

  @ApiBearerAuth()
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth()
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Put()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateByProductCode(@Query('productCode') productCode: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateByProductCode(productCode, updateProductDto);
  }

  @ApiBearerAuth()
  @Throttle({ default: { limit: 50, ttl: 60000 } })
  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  removeByProductCode(@Query('productCode') productCode: string) {
    return this.productsService.removeByProductCode(productCode);
  }
  
}
