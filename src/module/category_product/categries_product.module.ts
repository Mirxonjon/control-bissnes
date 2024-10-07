import { Module } from '@nestjs/common';
import { ProductCategoriesController } from './categries_product.controller';
import { ProductCategoriesService } from './categries_product.service';

@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
