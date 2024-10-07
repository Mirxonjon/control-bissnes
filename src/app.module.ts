import { Module, CacheModuleOptions } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { connectDb } from './config/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './module/auth/auth.module';
import { ProductCategoriesModule } from './module/category_product/categries_product.module';
import { ProductModule } from './module/product/product.module';
import { DebtModule } from './module/debt/debt.module';
import { CarServiceModule } from './module/car_service/car_service.module';
import { OrderModule } from './module/order/order.module';
import { RolesGuard } from './module/auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    TypeOrmModule.forRoot(connectDb),
    // CacheModule.registerAsync({
    //   isGlobal: true,
    //   useFactory: (): CacheMowuleOptions => ({
    //     ttl: 3600000,
    //   }),
    // }),
    AuthModule,
    ProductCategoriesModule,
    OrderModule,
    ProductModule,
    DebtModule,
    CarServiceModule,
  ],
  controllers: [],
  providers: [    {
    provide: 'APP_GUARD',
    useClass: RolesGuard,
  },],
})
export class AppModule {}
