import { Module } from '@nestjs/common';
import { CarServiceController } from './car_service.controller';
import { CarServiceServise } from './car_service.service';
import { AuthServise } from '../auth/auth.service';

@Module({
  controllers: [CarServiceController],
  providers: [CarServiceServise],
})
export class CarServiceModule {}
