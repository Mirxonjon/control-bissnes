"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OrderServise_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServise = void 0;
const common_1 = require("@nestjs/common");
const debt_entity_1 = require("../../entities/debt.entity");
const users_entity_1 = require("../../entities/users.entity");
const orders_entity_1 = require("../../entities/orders.entity");
const types_1 = require("../../types");
const order_products_entity_1 = require("../../entities/order_products.entity");
const products_entity_1 = require("../../entities/products.entity");
const car_service_entity_1 = require("../../entities/car_service.entity");
let OrderServise = OrderServise_1 = class OrderServise {
    constructor() {
        this.logger = new common_1.Logger(OrderServise_1.name);
    }
    async findAll() {
        const methodName = this.findAll;
        try {
            const allDebts = await orders_entity_1.OrdersEntity.find({
                relations: {
                    user_id: true,
                    carServices: true,
                    orderProducts: true,
                },
                order: {
                    create_data: 'desc',
                },
            }).catch((e) => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            return allDebts;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const methodName = this.findOne;
        try {
            const findOrder = await orders_entity_1.OrdersEntity.findOneBy({ id }).catch((e) => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findOrder) {
                this.logger.debug(`Method: ${methodName} - Order Not Found: `, findOrder);
                throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
            }
            return findOrder;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        const methodName = this.create;
        try {
            console.log(body);
            const findUser = await users_entity_1.UsersEntity.findOne({
                where: {
                    id: body.user_id,
                },
            }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findUser) {
                this.logger.debug(`Method: ${methodName} - User not found: `, findUser);
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const createOrder = await orders_entity_1.OrdersEntity.createQueryBuilder()
                .insert()
                .into(orders_entity_1.OrdersEntity)
                .values({
                total_price: body.total_price,
                daily_price: body.daily_price,
                paid_total: body.paid_total,
                IsActive: types_1.StatusEnum.TRUE,
                user_id: findUser,
            })
                .execute()
                .catch((e) => {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            });
            if (!createOrder.raw[0].id) {
                this.logger.debug(`Method: ${methodName} - Erorr Insert Order: `, createOrder);
                throw new common_1.HttpException('insert Erorr in Order', common_1.HttpStatus.BAD_REQUEST);
            }
            for (const product of body === null || body === void 0 ? void 0 : body.products) {
                const findProduct = await products_entity_1.ProductsEntity.findOne({
                    where: {
                        id: product.product_id,
                    },
                }).catch(() => {
                    throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
                });
                if (!findProduct) {
                    this.logger.debug(`Method: ${methodName} - Product not found: `, findProduct);
                    throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                }
                if (findProduct.type == types_1.TypeProductEnum.COUNT) {
                    if (+product.quantity_sold > +findProduct.current_quantity) {
                        throw new common_1.HttpException('quantity sold is more than quantity product', common_1.HttpStatus.BAD_REQUEST);
                    }
                    const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                        .update()
                        .set({
                        current_quantity: `${+findProduct.current_quantity - +product.quantity_sold}`,
                    })
                        .where('id = :id', { id: findProduct.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!updateProductResult.affected) {
                        this.logger.debug(`Method: ${methodName} - Product Update Error Count: `, updateProductResult);
                        throw new common_1.HttpException('Product Update Error Count', common_1.HttpStatus.NOT_FOUND);
                    }
                }
                if (findProduct.type == types_1.TypeProductEnum.METR) {
                    if (+product.measurement_sold > +findProduct.current_measurement) {
                        throw new common_1.HttpException('measurement sold is more than measurement product', common_1.HttpStatus.BAD_REQUEST);
                    }
                    const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                        .update()
                        .set({
                        current_measurement: `${+findProduct.current_measurement - +product.measurement_sold}`,
                    })
                        .where('id = :id', { id: findProduct.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!updateProductResult.affected) {
                        this.logger.debug(`Method: ${methodName} - Product Update Error Metr: `, updateProductResult);
                        throw new common_1.HttpException('Product Update Error Metr', common_1.HttpStatus.NOT_FOUND);
                    }
                }
                const createOrderProdut = await order_products_entity_1.OrderProductsEntity.createQueryBuilder()
                    .insert()
                    .into(order_products_entity_1.OrderProductsEntity)
                    .values({
                    measurement_sold: product.measurement_sold,
                    quantity_sold: product.quantity_sold,
                    price_per_day: product.price_per_day,
                    IsActive: types_1.OrderProductTypeEnum.ACTIVE,
                    unused_days: product.unused_days,
                    given_date: product.given_date,
                    end_date: product.end_date,
                    order_id: createOrder.raw[0].id,
                    product_id: findProduct,
                })
                    .execute()
                    .catch((e) => {
                    throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                });
                if (!createOrderProdut.raw[0].id) {
                    this.logger.debug(`Method: ${methodName} - Erorr Insert Order Product : `, createOrderProdut);
                    throw new common_1.HttpException('insert Erorr in order Product', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            for (const service_car of body === null || body === void 0 ? void 0 : body.service_car) {
                console.log(service_car, 'Service Car', createOrder.raw[0].id);
                const createServiceCar = await car_service_entity_1.CarServiceEntity.createQueryBuilder()
                    .insert()
                    .into(car_service_entity_1.CarServiceEntity)
                    .values({
                    profit_or_expense: types_1.ServiceCarTypeEnum.PROFIT,
                    price: service_car.price,
                    comment: service_car.comment,
                    order_id: createOrder.raw[0].id,
                    user_id: findUser,
                })
                    .execute()
                    .catch((e) => {
                    throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                });
                if (!createServiceCar.raw[0].id) {
                    this.logger.debug(`Method: ${methodName} - Erorr Insert Service Car : `, createServiceCar);
                    throw new common_1.HttpException('insert Erorr in Service car', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            return {
                message: 'create order',
            };
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        const methodName = this.update;
        try {
            const findOrder = await orders_entity_1.OrdersEntity.findOne({
                where: { id },
            });
            if (!findOrder) {
                this.logger.debug(`Method: ${methodName} - Order Not Found: `, findOrder);
                throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
            }
            let findUser = findOrder === null || findOrder === void 0 ? void 0 : findOrder.user_id;
            if (body.user_id != 'null') {
                findUser = await users_entity_1.UsersEntity.findOne({
                    where: {
                        id: body.user_id,
                    },
                });
                if (!findUser) {
                    this.logger.debug(`Method: ${methodName} - User Not Found: `, findUser);
                    throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            const updatedOrder = await orders_entity_1.OrdersEntity.update(id, {
                total_price: body.total_price || findOrder.total_price,
                daily_price: body.daily_price || findOrder.daily_price,
                paid_total: body.paid_total || findOrder.paid_total,
            });
            if (!updatedOrder.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Update Order: `, updatedOrder);
                throw new common_1.HttpException('update Erorr in Order', common_1.HttpStatus.BAD_REQUEST);
            }
            for (const product of body === null || body === void 0 ? void 0 : body.products) {
                if (product.action == types_1.ActionTypesEnum.CREATE) {
                    const findProduct = await products_entity_1.ProductsEntity.findOne({
                        where: {
                            id: product.product_id,
                        },
                    }).catch(() => {
                        throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!findProduct) {
                        this.logger.debug(`Method: ${methodName} - Product not found: `, findProduct);
                        throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    if (findProduct.type == types_1.TypeProductEnum.COUNT) {
                        if (+product.quantity_sold > +findProduct.current_quantity) {
                            throw new common_1.HttpException('quantity sold is more than quantity product', common_1.HttpStatus.BAD_REQUEST);
                        }
                        const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                            .update()
                            .set({
                            current_quantity: `${+findProduct.current_quantity - +product.quantity_sold}`,
                        })
                            .where('id = :id', { id: findProduct.id })
                            .execute()
                            .catch((e) => {
                            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!updateProductResult.affected) {
                            this.logger.debug(`Method: ${methodName} - Product Update Error Count: `, updateProductResult);
                            throw new common_1.HttpException('Product Update Error Count', common_1.HttpStatus.NOT_FOUND);
                        }
                    }
                    if (findProduct.type == types_1.TypeProductEnum.METR) {
                        if (+product.measurement_sold > +findProduct.current_measurement) {
                            throw new common_1.HttpException('measurement sold is more than measurement product', common_1.HttpStatus.BAD_REQUEST);
                        }
                        const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                            .update()
                            .set({
                            current_measurement: `${+findProduct.current_measurement - +product.measurement_sold}`,
                        })
                            .where('id = :id', { id: findProduct.id })
                            .execute()
                            .catch((e) => {
                            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!updateProductResult.affected) {
                            this.logger.debug(`Method: ${methodName} - Product Update Error Metr: `, updateProductResult);
                            throw new common_1.HttpException('Product Update Error Metr', common_1.HttpStatus.NOT_FOUND);
                        }
                    }
                    const createOrderProdut = await order_products_entity_1.OrderProductsEntity.createQueryBuilder()
                        .insert()
                        .into(order_products_entity_1.OrderProductsEntity)
                        .values({
                        measurement_sold: product.measurement_sold,
                        quantity_sold: product.quantity_sold,
                        price_per_day: product.price_per_day,
                        IsActive: types_1.OrderProductTypeEnum.ACTIVE,
                        unused_days: product.unused_days,
                        given_date: product.given_date,
                        end_date: product.end_date,
                        order_id: findOrder,
                        product_id: findProduct,
                    })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!createOrderProdut.raw[0].id) {
                        this.logger.debug(`Method: ${methodName} - Erorr Insert Order Product : `, createOrderProdut);
                        throw new common_1.HttpException('insert Erorr in order Product', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else if (product.action == types_1.ActionTypesEnum.UPDATE) {
                    const findOrderProduct = await order_products_entity_1.OrderProductsEntity.findOne({
                        where: { id: product.order_product_id },
                    });
                    if (!findOrderProduct) {
                        this.logger.debug(`Method: ${methodName} - Order Product not found: `, findOrderProduct);
                        throw new common_1.HttpException('Order Product not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    const findProduct = await products_entity_1.ProductsEntity.findOne({
                        where: {
                            id: product.product_id,
                        },
                    }).catch(() => {
                        throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!findProduct) {
                        this.logger.debug(`Method: ${methodName} - Product not found: `, findProduct);
                        throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    if (product.status == 'active') {
                        if (findProduct.type == types_1.TypeProductEnum.COUNT) {
                            let currentQuantity = +findProduct.current_quantity + +findOrderProduct.quantity_sold;
                            if (+product.quantity_sold > currentQuantity) {
                                throw new common_1.HttpException('quantity sold is more than quantity product', common_1.HttpStatus.BAD_REQUEST);
                            }
                            const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                                .update()
                                .set({
                                current_quantity: `${currentQuantity - +product.quantity_sold}`,
                            })
                                .where('id = :id', { id: findProduct.id })
                                .execute()
                                .catch((e) => {
                                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                            });
                            if (!updateProductResult.affected) {
                                this.logger.debug(`Method: ${methodName} - Product Update Error Count: `, updateProductResult);
                                throw new common_1.HttpException('Product Update Error Count', common_1.HttpStatus.NOT_FOUND);
                            }
                        }
                        if (findProduct.type == types_1.TypeProductEnum.METR) {
                            let currentMeasurement = +findProduct.current_measurement +
                                +findOrderProduct.measurement_sold;
                            if (+product.measurement_sold > currentMeasurement) {
                                throw new common_1.HttpException('measurement sold is more than measurement product', common_1.HttpStatus.BAD_REQUEST);
                            }
                            const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                                .update()
                                .set({
                                current_measurement: `${currentMeasurement - +product.measurement_sold}`,
                            })
                                .where('id = :id', { id: findProduct.id })
                                .execute()
                                .catch((e) => {
                                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                            });
                            if (!updateProductResult.affected) {
                                this.logger.debug(`Method: ${methodName} - Product Update Error Metr: `, updateProductResult);
                                throw new common_1.HttpException('Product Update Error Metr', common_1.HttpStatus.NOT_FOUND);
                            }
                        }
                        const updateOrderProduct = await order_products_entity_1.OrderProductsEntity.createQueryBuilder()
                            .update()
                            .set({
                            measurement_sold: product.measurement_sold || findOrderProduct.measurement_sold,
                            quantity_sold: product.quantity_sold || findOrderProduct.quantity_sold,
                            price_per_day: product.price_per_day || findOrderProduct.price_per_day,
                            unused_days: product.unused_days || findOrderProduct.unused_days,
                            IsActive: product.status == 'active' ? types_1.OrderProductTypeEnum.ACTIVE : types_1.OrderProductTypeEnum.INACTIVE,
                            given_date: product.given_date || findOrderProduct.given_date,
                            end_date: product.end_date || findOrderProduct.end_date,
                            product_id: findProduct,
                        })
                            .where('id = :id', { id: findOrderProduct.id })
                            .execute()
                            .catch((e) => {
                            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!updateOrderProduct.affected) {
                            this.logger.debug(`Method: ${methodName} - Erorr Update Order Product : `, updateOrderProduct);
                            throw new common_1.HttpException('Update Erorr in order Product', common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                    else {
                        const findOrderProduct = await order_products_entity_1.OrderProductsEntity.findOne({
                            where: { id: product.order_product_id },
                        });
                        if (!findOrderProduct) {
                            this.logger.debug(`Method: ${methodName} - Order Product not found: `, findOrderProduct);
                            throw new common_1.HttpException('Order Product not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        const findProduct = await products_entity_1.ProductsEntity.findOne({
                            where: {
                                id: product.product_id,
                            },
                        }).catch(() => {
                            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!findProduct) {
                            this.logger.debug(`Method: ${methodName} - Product not found: `, findProduct);
                            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        if (findProduct.type == types_1.TypeProductEnum.COUNT) {
                            let currentQuantity = +findProduct.current_quantity + +findOrderProduct.quantity_sold;
                            const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                                .update()
                                .set({
                                current_quantity: `${currentQuantity}`,
                            })
                                .where('id = :id', { id: findProduct.id })
                                .execute()
                                .catch((e) => {
                                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                            });
                            if (!updateProductResult.affected) {
                                this.logger.debug(`Method: ${methodName} - Product Update Error Count: `, updateProductResult);
                                throw new common_1.HttpException('Product Update Error Count', common_1.HttpStatus.NOT_FOUND);
                            }
                        }
                        if (findProduct.type == types_1.TypeProductEnum.METR) {
                            let currentMeasurement = +findProduct.current_measurement +
                                +findOrderProduct.measurement_sold;
                            const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                                .update()
                                .set({
                                current_measurement: `${currentMeasurement}`,
                            })
                                .where('id = :id', { id: findProduct.id })
                                .execute()
                                .catch((e) => {
                                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                            });
                            if (!updateProductResult.affected) {
                                this.logger.debug(`Method: ${methodName} - Product Update Error Metr: `, updateProductResult);
                                throw new common_1.HttpException('Product Update Error Metr', common_1.HttpStatus.NOT_FOUND);
                            }
                        }
                        const updateOrderProduct = await order_products_entity_1.OrderProductsEntity.createQueryBuilder()
                            .update()
                            .set({
                            measurement_sold: product.measurement_sold || findOrderProduct.measurement_sold,
                            quantity_sold: product.quantity_sold || findOrderProduct.quantity_sold,
                            price_per_day: product.price_per_day || findOrderProduct.price_per_day,
                            unused_days: product.unused_days || findOrderProduct.unused_days,
                            IsActive: product.status == 'active' ? types_1.OrderProductTypeEnum.ACTIVE : types_1.OrderProductTypeEnum.INACTIVE,
                            given_date: product.given_date || findOrderProduct.given_date,
                            end_date: product.end_date || findOrderProduct.end_date,
                            product_id: findProduct,
                        })
                            .where('id = :id', { id: findOrderProduct.id })
                            .execute()
                            .catch((e) => {
                            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!updateOrderProduct.affected) {
                            this.logger.debug(`Method: ${methodName} - Erorr Update Order Product : `, updateOrderProduct);
                            throw new common_1.HttpException('Update Erorr in order Product', common_1.HttpStatus.BAD_REQUEST);
                        }
                    }
                }
                else if (product.action == types_1.ActionTypesEnum.DELETE) {
                    const findOrderProduct = await order_products_entity_1.OrderProductsEntity.findOne({
                        where: { id: product.order_product_id },
                    });
                    if (!findOrderProduct) {
                        this.logger.debug(`Method: ${methodName} - Order Product not found: `, findOrderProduct);
                        throw new common_1.HttpException('Order Product not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    const findProduct = await products_entity_1.ProductsEntity.findOne({
                        where: {
                            id: product.product_id,
                        },
                    }).catch(() => {
                        throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!findProduct) {
                        this.logger.debug(`Method: ${methodName} - Product not found: `, findProduct);
                        throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    if (findProduct.type == types_1.TypeProductEnum.COUNT) {
                        let currentQuantity = +findProduct.current_quantity + +findOrderProduct.quantity_sold;
                        const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                            .update()
                            .set({
                            current_quantity: `${currentQuantity}`,
                        })
                            .where('id = :id', { id: findProduct.id })
                            .execute()
                            .catch((e) => {
                            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!updateProductResult.affected) {
                            this.logger.debug(`Method: ${methodName} - Product Update Error Count: `, updateProductResult);
                            throw new common_1.HttpException('Product Update Error Count', common_1.HttpStatus.NOT_FOUND);
                        }
                    }
                    if (findProduct.type == types_1.TypeProductEnum.METR) {
                        let currentMeasurement = +findProduct.current_measurement +
                            +findOrderProduct.measurement_sold;
                        const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                            .update()
                            .set({
                            current_measurement: `${currentMeasurement}`,
                        })
                            .where('id = :id', { id: findProduct.id })
                            .execute()
                            .catch((e) => {
                            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                        });
                        if (!updateProductResult.affected) {
                            this.logger.debug(`Method: ${methodName} - Product Update Error Metr: `, updateProductResult);
                            throw new common_1.HttpException('Product Update Error Metr', common_1.HttpStatus.NOT_FOUND);
                        }
                    }
                    const deleteOrderProduct = await order_products_entity_1.OrderProductsEntity.createQueryBuilder()
                        .delete()
                        .where('id = :id', { id: findOrderProduct.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!deleteOrderProduct.affected) {
                        this.logger.debug(`Method: ${methodName} - Erorr Delete Order Product : `, deleteOrderProduct);
                        throw new common_1.HttpException('Delete Erorr in order Product', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
            }
            for (const service_car of body === null || body === void 0 ? void 0 : body.service_car) {
                if (service_car.action == types_1.ActionTypesEnum.CREATE) {
                    const createServiceCar = await car_service_entity_1.CarServiceEntity.createQueryBuilder()
                        .insert()
                        .into(car_service_entity_1.CarServiceEntity)
                        .values({
                        profit_or_expense: types_1.ServiceCarTypeEnum.PROFIT,
                        price: service_car.price,
                        comment: service_car.comment,
                        order_id: findOrder,
                        user_id: findUser,
                    })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!createServiceCar.raw[0].id) {
                        this.logger.debug(`Method: ${methodName} - Erorr Insert Service Car : `, createServiceCar);
                        throw new common_1.HttpException('insert Erorr in Service car', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else if (service_car.action == types_1.ActionTypesEnum.UPDATE) {
                    const findServiceCar = await car_service_entity_1.CarServiceEntity.findOne({
                        where: { id: service_car.service_car_id },
                    });
                    if (!findServiceCar) {
                        this.logger.debug(`Method: ${methodName} - Service Car not found: `, findServiceCar);
                        throw new common_1.HttpException('Service Car not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    const updateServiceCar = await car_service_entity_1.CarServiceEntity.createQueryBuilder()
                        .update()
                        .set({
                        price: service_car.price || findServiceCar.price,
                        comment: service_car.comment || findServiceCar.comment,
                    })
                        .where('id = :id', { id: findServiceCar.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!updateServiceCar.affected) {
                        this.logger.debug(`Method: ${methodName} - Erorr Update Service Car : `, updateServiceCar);
                        throw new common_1.HttpException('Update Erorr in Service Car', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else if (service_car.action == types_1.ActionTypesEnum.DELETE) {
                    const findServiceCar = await car_service_entity_1.CarServiceEntity.findOne({
                        where: { id: service_car.service_car_id },
                    });
                    if (!findServiceCar) {
                        this.logger.debug(`Method: ${methodName} - Service Car not found: `, findServiceCar);
                        throw new common_1.HttpException('Service Car not found', common_1.HttpStatus.NOT_FOUND);
                    }
                    const deleteServiceCar = await car_service_entity_1.CarServiceEntity.createQueryBuilder()
                        .delete()
                        .where('id = :id', { id: findServiceCar.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!deleteServiceCar.affected) {
                        this.logger.debug(`Method: ${methodName} - Erorr Delete Service Car : `, deleteServiceCar);
                        throw new common_1.HttpException('Delete Erorr in Service Car', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
            }
            return updatedOrder;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateStatus(id, body) {
        const methodName = this.update;
        try {
            const findOrder = await orders_entity_1.OrdersEntity.findOne({
                where: { id },
                relations: {
                    orderProducts: {
                        product_id: true,
                    },
                },
            });
            if (!findOrder) {
                this.logger.debug(`Method: ${methodName} - Order Not Found: `, findOrder);
                throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
            }
            const updatedOrder = await orders_entity_1.OrdersEntity.update(id, {
                IsActive: body.status == 'true' ? types_1.StatusEnum.TRUE : types_1.StatusEnum.FALSE,
            });
            if (!updatedOrder.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Update Order: `, updatedOrder);
                throw new common_1.HttpException('update Erorr in Order', common_1.HttpStatus.BAD_REQUEST);
            }
            const createDebt = await debt_entity_1.DebtsEntity.createQueryBuilder()
                .insert()
                .into(debt_entity_1.DebtsEntity)
                .values({
                remaining_debt: body.debts.remaining_debt,
                comment: body.debts.comment,
                order_id: findOrder,
                dayGiven: body.debts.dayGiven,
                isActive: types_1.StatusEnum.TRUE,
                dayToBeGiven: body.debts.dayToBeGiven,
                user_id: findOrder.user_id,
            })
                .execute()
                .catch((e) => {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            });
            if (!createDebt.raw[0].id) {
                this.logger.debug(`Method: ${methodName} - Erorr Insert Debt: `, createDebt);
                throw new common_1.HttpException('insert Erorr in Debt', common_1.HttpStatus.BAD_REQUEST);
            }
            for (let orderProduct of findOrder === null || findOrder === void 0 ? void 0 : findOrder.orderProducts) {
                if (orderProduct.product_id.type == types_1.TypeProductEnum.COUNT) {
                    let currentQuantity = +orderProduct.product_id.current_quantity -
                        +orderProduct.quantity_sold;
                    const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                        .update()
                        .set({
                        current_quantity: `${currentQuantity}`,
                    })
                        .where('id = :id', { id: orderProduct.product_id.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!updateProductResult.affected) {
                        this.logger.debug(`Method: ${methodName} - Product Update Error Count: `, updateProductResult);
                        throw new common_1.HttpException('Product Update Error Count', common_1.HttpStatus.NOT_FOUND);
                    }
                }
                else if (orderProduct.product_id.type == types_1.TypeProductEnum.METR) {
                    let currentMeasurement = +orderProduct.product_id.current_measurement -
                        +orderProduct.measurement_sold;
                    const updateProductResult = await products_entity_1.ProductsEntity.createQueryBuilder()
                        .update()
                        .set({
                        current_measurement: `${currentMeasurement}`,
                    })
                        .where('id = :id', { id: orderProduct.product_id.id })
                        .execute()
                        .catch((e) => {
                        throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                    });
                    if (!updateProductResult.affected) {
                        this.logger.debug(`Method: ${methodName} - Product Update Error Metr: `, updateProductResult);
                        throw new common_1.HttpException('Product Update Error Metr', common_1.HttpStatus.NOT_FOUND);
                    }
                }
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const methodName = this.delete;
        try {
            const findDebt = await debt_entity_1.DebtsEntity.findOneBy({ id }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findDebt) {
                this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
                throw new common_1.HttpException('Debt not found', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteDebt = await debt_entity_1.DebtsEntity.delete({ id });
            if (!deleteDebt.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Delete Debt: `, deleteDebt);
                throw new common_1.HttpException('delete Erorr in Debt', common_1.HttpStatus.BAD_REQUEST);
            }
            return deleteDebt;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
OrderServise = OrderServise_1 = __decorate([
    (0, common_1.Injectable)()
], OrderServise);
exports.OrderServise = OrderServise;
//# sourceMappingURL=order.service.js.map