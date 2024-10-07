import { Module } from '@nestjs/common';
import { OrdersController } from './order.controller';
import { OrderServise } from './order.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [OrdersController],
  providers: [OrderServise],
})
export class OrderModule {}
