import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductServise } from './product.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductServise, AuthServise],
})
export class ProductModule {}
