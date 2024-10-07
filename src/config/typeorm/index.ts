import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { ProductCategoriesEntity } from 'src/entities/product_Categories.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { OrdersEntity } from 'src/entities/orders.entity';
import { OrderProductsEntity } from 'src/entities/order_products.entity';
import { DebtsEntity } from 'src/entities/debt.entity';
import { CarServiceEntity } from 'src/entities/car_service.entity';

dotenv.config();

export const connectDb: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  password: String(process.env.DB_PASSWORD),
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  entities: [
    UsersEntity,
    ProductCategoriesEntity,
    ProductsEntity,
    OrdersEntity,
    OrderProductsEntity,
    DebtsEntity,
    CarServiceEntity,
  ],
  autoLoadEntities: true,
  synchronize: true,
};
