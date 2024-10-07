"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const dotenv = require("dotenv");
const users_entity_1 = require("../../entities/users.entity");
const product_Categories_entity_1 = require("../../entities/product_Categories.entity");
const products_entity_1 = require("../../entities/products.entity");
const orders_entity_1 = require("../../entities/orders.entity");
const order_products_entity_1 = require("../../entities/order_products.entity");
const debt_entity_1 = require("../../entities/debt.entity");
const car_service_entity_1 = require("../../entities/car_service.entity");
dotenv.config();
exports.connectDb = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    password: String(process.env.DB_PASSWORD),
    username: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    entities: [
        users_entity_1.UsersEntity,
        product_Categories_entity_1.ProductCategoriesEntity,
        products_entity_1.ProductsEntity,
        orders_entity_1.OrdersEntity,
        order_products_entity_1.OrderProductsEntity,
        debt_entity_1.DebtsEntity,
        car_service_entity_1.CarServiceEntity,
    ],
    autoLoadEntities: true,
    synchronize: true,
};
//# sourceMappingURL=index.js.map