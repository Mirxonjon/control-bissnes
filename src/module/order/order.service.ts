import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update_order.dto';

import { DeleteResult, InsertResult, Like, UpdateResult } from 'typeorm';
import { DebtsEntity } from 'src/entities/debt.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { OrdersEntity } from 'src/entities/orders.entity';
import {
  ActionTypesEnum,
  OrderProductTypeEnum,
  ServiceCarTypeEnum,
  StatusEnum,
  TypeProductEnum,
} from 'src/types';
import { OrderProductsEntity } from 'src/entities/order_products.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { CarServiceEntity } from 'src/entities/car_service.entity';

@Injectable()
export class OrderServise {
  private logger = new Logger(OrderServise.name);

  async findAll() {
    const methodName = this.findAll;

    try {
      const allDebts = await OrdersEntity.find({

        relations: {
          user_id:true,
          carServices: true,
          orderProducts: true,

        },
        order: {
          create_data: 'desc',
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      return allDebts;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    const methodName = this.findOne;
    try {
      const findOrder = await OrdersEntity.findOneBy({ id }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      if (!findOrder) {
        this.logger.debug(`Method: ${methodName} - Order Not Found: `, findOrder);
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      return findOrder;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: CreateOrderDto) {
    const methodName = this.create;
    try {
      console.log(body);

      const findUser = await UsersEntity.findOne({
        where: {
          id: body.user_id,
        },
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findUser) {
        this.logger.debug(`Method: ${methodName} - User not found: `, findUser);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const createOrder: InsertResult = await OrdersEntity.createQueryBuilder()
        .insert()
        .into(OrdersEntity)
        .values({
          total_price: body.total_price,
          daily_price: body.daily_price,
          paid_total: body.paid_total,
          IsActive: StatusEnum.TRUE,
          user_id: findUser,
        })
        .execute()
        .catch((e) => {
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });

      if (!createOrder.raw[0].id) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Insert Order: `,
          createOrder,
        );
        throw new HttpException(
          'insert Erorr in Order',
          HttpStatus.BAD_REQUEST,
        );
      }

      for (const product of body?.products) {
        const findProduct = await ProductsEntity.findOne({
          where: {
            id: product.product_id,
          },
        }).catch(() => {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        });

        if (!findProduct) {
          this.logger.debug(
            `Method: ${methodName} - Product not found: `,
            findProduct,
          );
          throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        if (findProduct.type == TypeProductEnum.COUNT) {
          if (+product.quantity_sold > +findProduct.current_quantity) {
            throw new HttpException(
              'quantity sold is more than quantity product',
              HttpStatus.BAD_REQUEST,
            );
          }
          const updateProductResult: UpdateResult =
            await ProductsEntity.createQueryBuilder()
              .update()
              .set({
                current_quantity: `${
                  +findProduct.current_quantity - +product.quantity_sold
                }`,
              })
              .where('id = :id', { id: findProduct.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!updateProductResult.affected) {
            this.logger.debug(
              `Method: ${methodName} - Product Update Error Count: `,
              updateProductResult,
            );
            throw new HttpException(
              'Product Update Error Count',
              HttpStatus.NOT_FOUND,
            );
          }
        }
        if (findProduct.type == TypeProductEnum.METR) {
          if (+product.measurement_sold > +findProduct.current_measurement) {
            throw new HttpException(
              'measurement sold is more than measurement product',
              HttpStatus.BAD_REQUEST,
            );
          }

          const updateProductResult: UpdateResult =
            await ProductsEntity.createQueryBuilder()
              .update()
              .set({
                current_measurement: `${
                  +findProduct.current_measurement - +product.measurement_sold
                }`,
              })
              .where('id = :id', { id: findProduct.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!updateProductResult.affected) {
            this.logger.debug(
              `Method: ${methodName} - Product Update Error Metr: `,
              updateProductResult,
            );
            throw new HttpException(
              'Product Update Error Metr',
              HttpStatus.NOT_FOUND,
            );
          }
        }

        const createOrderProdut: InsertResult =
          await OrderProductsEntity.createQueryBuilder()
            .insert()
            .into(OrderProductsEntity)
            .values({
              measurement_sold: product.measurement_sold,
              quantity_sold: product.quantity_sold,
              price_per_day: product.price_per_day,
              IsActive : OrderProductTypeEnum.ACTIVE,
              unused_days: product.unused_days,
              given_date: product.given_date,
              end_date: product.end_date,
              order_id: createOrder.raw[0].id,
              product_id: findProduct,
              // user_id: findProduct,
            })
            .execute()
            .catch((e) => {
              throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            });

        if (!createOrderProdut.raw[0].id) {
          this.logger.debug(
            `Method: ${methodName} - Erorr Insert Order Product : `,
            createOrderProdut,
          );
          throw new HttpException(
            'insert Erorr in order Product',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      for (const service_car of body?.service_car) {
        console.log(service_car ,'Service Car' , createOrder.raw[0].id);
        
        const createServiceCar: InsertResult =
          await CarServiceEntity.createQueryBuilder()
            .insert()
            .into(CarServiceEntity)
            .values({
              profit_or_expense: ServiceCarTypeEnum.PROFIT,
              price: service_car.price,
              comment: service_car.comment,
              order_id: createOrder.raw[0].id,
              user_id: findUser,
              // product_id: findProduct,
              // user_id: findProduct,
            })
            .execute()
            .catch((e) => {
              throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            });

        if (!createServiceCar.raw[0].id) {
          this.logger.debug(
            `Method: ${methodName} - Erorr Insert Service Car : `,
            createServiceCar,
          );
          throw new HttpException(
            'insert Erorr in Service car',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      return {
        message: 'create order',
      };
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, body: UpdateOrderDto) {
    const methodName = this.update;

    try {
      const findOrder = await OrdersEntity.findOne({
        where: { id },
      });

      if (!findOrder) {
        this.logger.debug(
          `Method: ${methodName} - Order Not Found: `,
          findOrder,
        );
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }

      let findUser = findOrder?.user_id;

      if (body.user_id != 'null') {
        findUser = await UsersEntity.findOne({
          where: {
            id: body.user_id,
          },
        });

        if (!findUser) {
          this.logger.debug(
            `Method: ${methodName} - User Not Found: `,
            findUser,
          );
          throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        }
      }

      const updatedOrder: UpdateResult = await OrdersEntity.update(id, {
        total_price: body.total_price || findOrder.total_price,
        daily_price: body.daily_price || findOrder.daily_price,
        paid_total: body.paid_total || findOrder.paid_total,
        // user_id: findUser,
      });
      if (!updatedOrder.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Update Order: `,
          updatedOrder,
        );
        throw new HttpException(
          'update Erorr in Order',
          HttpStatus.BAD_REQUEST,
        );
      }

      for (const product of body?.products) {
        if (product.action == ActionTypesEnum.CREATE) {
          const findProduct = await ProductsEntity.findOne({
            where: {
              id: product.product_id,
            },
          }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
          });

          if (!findProduct) {
            this.logger.debug(
              `Method: ${methodName} - Product not found: `,
              findProduct,
            );
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
          }
          if (findProduct.type == TypeProductEnum.COUNT) {
            if (+product.quantity_sold > +findProduct.current_quantity) {
              throw new HttpException(
                'quantity sold is more than quantity product',
                HttpStatus.BAD_REQUEST,
              );
            }
            const updateProductResult: UpdateResult =
              await ProductsEntity.createQueryBuilder()
                .update()
                .set({
                  current_quantity: `${
                    +findProduct.current_quantity - +product.quantity_sold
                  }`,
                })
                .where('id = :id', { id: findProduct.id })
                .execute()
                .catch((e) => {
                  throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                });

            if (!updateProductResult.affected) {
              this.logger.debug(
                `Method: ${methodName} - Product Update Error Count: `,
                updateProductResult,
              );
              throw new HttpException(
                'Product Update Error Count',
                HttpStatus.NOT_FOUND,
              );
            }
          }
          if (findProduct.type == TypeProductEnum.METR) {
            if (+product.measurement_sold > +findProduct.current_measurement) {
              throw new HttpException(
                'measurement sold is more than measurement product',
                HttpStatus.BAD_REQUEST,
              );
            }

            const updateProductResult: UpdateResult =
              await ProductsEntity.createQueryBuilder()
                .update()
                .set({
                  current_measurement: `${
                    +findProduct.current_measurement - +product.measurement_sold
                  }`,
                })
                .where('id = :id', { id: findProduct.id })
                .execute()
                .catch((e) => {
                  throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                });

            if (!updateProductResult.affected) {
              this.logger.debug(
                `Method: ${methodName} - Product Update Error Metr: `,
                updateProductResult,
              );
              throw new HttpException(
                'Product Update Error Metr',
                HttpStatus.NOT_FOUND,
              );
            }
          }

          const createOrderProdut: InsertResult =
            await OrderProductsEntity.createQueryBuilder()
              .insert()
              .into(OrderProductsEntity)
              .values({
                measurement_sold: product.measurement_sold,
                quantity_sold: product.quantity_sold,
                price_per_day: product.price_per_day,
                IsActive : OrderProductTypeEnum.ACTIVE,
                unused_days: product.unused_days,
                given_date: product.given_date,
                end_date: product.end_date,
                order_id: findOrder,
                product_id: findProduct,
                // user_id: findProduct,
              })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!createOrderProdut.raw[0].id) {
            this.logger.debug(
              `Method: ${methodName} - Erorr Insert Order Product : `,
              createOrderProdut,
            );
            throw new HttpException(
              'insert Erorr in order Product',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else if (product.action == ActionTypesEnum.UPDATE) {
          const findOrderProduct = await OrderProductsEntity.findOne({
            where: { id: product.order_product_id },
          });

          if (!findOrderProduct) {
            this.logger.debug(
              `Method: ${methodName} - Order Product not found: `,
              findOrderProduct,
            );
            throw new HttpException(
              'Order Product not found',
              HttpStatus.NOT_FOUND,
            );
          }
          const findProduct = await ProductsEntity.findOne({
            where: {
              id: product.product_id,
            },
          }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
          });

          if (!findProduct) {
            this.logger.debug(
              `Method: ${methodName} - Product not found: `,
              findProduct,
            );
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
          }

          if(product.status == 'active'){
            if (findProduct.type == TypeProductEnum.COUNT) {
              let currentQuantity =
                +findProduct.current_quantity + +findOrderProduct.quantity_sold;
              if (+product.quantity_sold > currentQuantity) {
                throw new HttpException(
                  'quantity sold is more than quantity product',
                  HttpStatus.BAD_REQUEST,
                );
              }
              const updateProductResult: UpdateResult =
                await ProductsEntity.createQueryBuilder()
                  .update()
                  .set({
                    current_quantity: `${
                      currentQuantity - +product.quantity_sold
                    }`,
                  })
                  .where('id = :id', { id: findProduct.id })
                  .execute()
                  .catch((e) => {
                    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                  });
  
              if (!updateProductResult.affected) {
                this.logger.debug(
                  `Method: ${methodName} - Product Update Error Count: `,
                  updateProductResult,
                );
                throw new HttpException(
                  'Product Update Error Count',
                  HttpStatus.NOT_FOUND,
                );
              }
            }
            if (findProduct.type == TypeProductEnum.METR) {
              let currentMeasurement =
                +findProduct.current_measurement +
                +findOrderProduct.measurement_sold;
              if (+product.measurement_sold > currentMeasurement) {
                throw new HttpException(
                  'measurement sold is more than measurement product',
                  HttpStatus.BAD_REQUEST,
                );
              }
  
              const updateProductResult: UpdateResult =
                await ProductsEntity.createQueryBuilder()
                  .update()
                  .set({
                    current_measurement: `${
                      currentMeasurement - +product.measurement_sold
                    }`,
                  })
                  .where('id = :id', { id: findProduct.id })
                  .execute()
                  .catch((e) => {
                    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                  });
  
              if (!updateProductResult.affected) {
                this.logger.debug(
                  `Method: ${methodName} - Product Update Error Metr: `,
                  updateProductResult,
                );
                throw new HttpException(
                  'Product Update Error Metr',
                  HttpStatus.NOT_FOUND,
                );
              }
            }
  
            const updateOrderProduct: UpdateResult =
              await OrderProductsEntity.createQueryBuilder()
                .update()
                .set({
                  measurement_sold:
                    product.measurement_sold || findOrderProduct.measurement_sold,
                  quantity_sold:
                    product.quantity_sold || findOrderProduct.quantity_sold,
                  price_per_day:
                    product.price_per_day || findOrderProduct.price_per_day,
                  unused_days:
                    product.unused_days || findOrderProduct.unused_days,
                  IsActive : product.status == 'active' ? OrderProductTypeEnum.ACTIVE : OrderProductTypeEnum.INACTIVE,
                  given_date: product.given_date || findOrderProduct.given_date,
                  end_date: product.end_date || findOrderProduct.end_date,
                  product_id: findProduct,
                })
                .where('id = :id', { id: findOrderProduct.id })
                .execute()
                .catch((e) => {
                  throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                });
  
            if (!updateOrderProduct.affected) {
              this.logger.debug(
                `Method: ${methodName} - Erorr Update Order Product : `,
                updateOrderProduct,
              );
              throw new HttpException(
                'Update Erorr in order Product',
                HttpStatus.BAD_REQUEST,
              );
            }
          }else {
            const findOrderProduct = await OrderProductsEntity.findOne({
              where: { id: product.order_product_id },
            });
            if (!findOrderProduct) {
              this.logger.debug(
                `Method: ${methodName} - Order Product not found: `,
                findOrderProduct,
              );
              throw new HttpException(
                'Order Product not found',
                HttpStatus.NOT_FOUND,
              );
            }
  
            const findProduct = await ProductsEntity.findOne({
              where: {
                id: product.product_id,
              },
            }).catch(() => {
              throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
            });
  
            if (!findProduct) {
              this.logger.debug(
                `Method: ${methodName} - Product not found: `,
                findProduct,
              );
              throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            if (findProduct.type == TypeProductEnum.COUNT) {
              let currentQuantity =
                +findProduct.current_quantity + +findOrderProduct.quantity_sold;
  
              const updateProductResult: UpdateResult =
                await ProductsEntity.createQueryBuilder()
                  .update()
                  .set({
                    current_quantity: `${currentQuantity}`,
                  })
                  .where('id = :id', { id: findProduct.id })
                  .execute()
                  .catch((e) => {
                    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                  });
  
              if (!updateProductResult.affected) {
                this.logger.debug(
                  `Method: ${methodName} - Product Update Error Count: `,
                  updateProductResult,
                );
                throw new HttpException(
                  'Product Update Error Count',
                  HttpStatus.NOT_FOUND,
                );
              }
            }
            if (findProduct.type == TypeProductEnum.METR) {
              let currentMeasurement =
                +findProduct.current_measurement +
                +findOrderProduct.measurement_sold;
  
              const updateProductResult: UpdateResult =
                await ProductsEntity.createQueryBuilder()
                  .update()
                  .set({
                    current_measurement: `${currentMeasurement}`,
                  })
                  .where('id = :id', { id: findProduct.id })
                  .execute()
                  .catch((e) => {
                    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                  });
  
              if (!updateProductResult.affected) {
                this.logger.debug(
                  `Method: ${methodName} - Product Update Error Metr: `,
                  updateProductResult,
                );
                throw new HttpException(
                  'Product Update Error Metr',
                  HttpStatus.NOT_FOUND,
                );
              }
            }
  
            const updateOrderProduct: DeleteResult =
            await OrderProductsEntity.createQueryBuilder()
            .update()
            .set({
              measurement_sold:
                product.measurement_sold || findOrderProduct.measurement_sold,
              quantity_sold:
                product.quantity_sold || findOrderProduct.quantity_sold,
              price_per_day:
                product.price_per_day || findOrderProduct.price_per_day,
              unused_days:
                product.unused_days || findOrderProduct.unused_days,
              IsActive : product.status == 'active' ? OrderProductTypeEnum.ACTIVE : OrderProductTypeEnum.INACTIVE,
              given_date: product.given_date || findOrderProduct.given_date,
              end_date: product.end_date || findOrderProduct.end_date,
              product_id: findProduct,
            })
            .where('id = :id', { id: findOrderProduct.id })
            .execute()
            .catch((e) => {
              throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            });

        if (!updateOrderProduct.affected) {
          this.logger.debug(
            `Method: ${methodName} - Erorr Update Order Product : `,
            updateOrderProduct,
          );
          throw new HttpException(
            'Update Erorr in order Product',
            HttpStatus.BAD_REQUEST,
          );
        }
          
          }

        } else if (product.action == ActionTypesEnum.DELETE) {
          const findOrderProduct = await OrderProductsEntity.findOne({
            where: { id: product.order_product_id },
          });
          if (!findOrderProduct) {
            this.logger.debug(
              `Method: ${methodName} - Order Product not found: `,
              findOrderProduct,
            );
            throw new HttpException(
              'Order Product not found',
              HttpStatus.NOT_FOUND,
            );
          }

          const findProduct = await ProductsEntity.findOne({
            where: {
              id: product.product_id,
            },
          }).catch(() => {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
          });

          if (!findProduct) {
            this.logger.debug(
              `Method: ${methodName} - Product not found: `,
              findProduct,
            );
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
          }
          if (findProduct.type == TypeProductEnum.COUNT) {
            let currentQuantity =
              +findProduct.current_quantity + +findOrderProduct.quantity_sold;

            const updateProductResult: UpdateResult =
              await ProductsEntity.createQueryBuilder()
                .update()
                .set({
                  current_quantity: `${currentQuantity}`,
                })
                .where('id = :id', { id: findProduct.id })
                .execute()
                .catch((e) => {
                  throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                });

            if (!updateProductResult.affected) {
              this.logger.debug(
                `Method: ${methodName} - Product Update Error Count: `,
                updateProductResult,
              );
              throw new HttpException(
                'Product Update Error Count',
                HttpStatus.NOT_FOUND,
              );
            }
          }
          if (findProduct.type == TypeProductEnum.METR) {
            let currentMeasurement =
              +findProduct.current_measurement +
              +findOrderProduct.measurement_sold;

            const updateProductResult: UpdateResult =
              await ProductsEntity.createQueryBuilder()
                .update()
                .set({
                  current_measurement: `${currentMeasurement}`,
                })
                .where('id = :id', { id: findProduct.id })
                .execute()
                .catch((e) => {
                  throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
                });

            if (!updateProductResult.affected) {
              this.logger.debug(
                `Method: ${methodName} - Product Update Error Metr: `,
                updateProductResult,
              );
              throw new HttpException(
                'Product Update Error Metr',
                HttpStatus.NOT_FOUND,
              );
            }
          }

          const deleteOrderProduct: DeleteResult =
            await OrderProductsEntity.createQueryBuilder()
              .delete()
              .where('id = :id', { id: findOrderProduct.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });
          if (!deleteOrderProduct.affected) {
            this.logger.debug(
              `Method: ${methodName} - Erorr Delete Order Product : `,
              deleteOrderProduct,
            );
            throw new HttpException(
              'Delete Erorr in order Product',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }

      for (const service_car of body?.service_car) {
        if (service_car.action == ActionTypesEnum.CREATE) {
          const createServiceCar: InsertResult =
            await CarServiceEntity.createQueryBuilder()
              .insert()
              .into(CarServiceEntity)
              .values({
                profit_or_expense: ServiceCarTypeEnum.PROFIT,
                price: service_car.price,
                comment: service_car.comment,
                order_id: findOrder,
                user_id: findUser,
                // product_id: findProduct,
                // user_id: findProduct,
              })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!createServiceCar.raw[0].id) {
            this.logger.debug(
              `Method: ${methodName} - Erorr Insert Service Car : `,
              createServiceCar,
            );
            throw new HttpException(
              'insert Erorr in Service car',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else if (service_car.action == ActionTypesEnum.UPDATE) {
          const findServiceCar = await CarServiceEntity.findOne({
            where: { id: service_car.service_car_id },
          });

          if (!findServiceCar) {
            this.logger.debug(
              `Method: ${methodName} - Service Car not found: `,
              findServiceCar,
            );
            throw new HttpException(
              'Service Car not found',
              HttpStatus.NOT_FOUND,
            );
          }

          const updateServiceCar: UpdateResult =
            await CarServiceEntity.createQueryBuilder()
              .update()
              .set({
                price: service_car.price || findServiceCar.price,
                comment: service_car.comment || findServiceCar.comment,
              })
              .where('id = :id', { id: findServiceCar.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!updateServiceCar.affected) {
            this.logger.debug(
              `Method: ${methodName} - Erorr Update Service Car : `,
              updateServiceCar,
            );
            throw new HttpException(
              'Update Erorr in Service Car',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else if (service_car.action == ActionTypesEnum.DELETE) {
          const findServiceCar = await CarServiceEntity.findOne({
            where: { id: service_car.service_car_id },
          });
          if (!findServiceCar) {
            this.logger.debug(
              `Method: ${methodName} - Service Car not found: `,
              findServiceCar,
            );
            throw new HttpException(
              'Service Car not found',
              HttpStatus.NOT_FOUND,
            );
          }

          const deleteServiceCar: DeleteResult =
            await CarServiceEntity.createQueryBuilder()
              .delete()
              .where('id = :id', { id: findServiceCar.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });
          if (!deleteServiceCar.affected) {
            this.logger.debug(
              `Method: ${methodName} - Erorr Delete Service Car : `,
              deleteServiceCar,
            );
            throw new HttpException(
              'Delete Erorr in Service Car',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
      }

      return updatedOrder;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(id: string, body: UpdateOrderStatusDto) {
    const methodName = this.update;

    try {
      const findOrder = await OrdersEntity.findOne({
        where: { id },
        relations: {
          orderProducts: {
            product_id: true,
          },
        },
      });

      if (!findOrder) {
        this.logger.debug(
          `Method: ${methodName} - Order Not Found: `,
          findOrder,
        );
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      }
      const updatedOrder: UpdateResult = await OrdersEntity.update(id, {
        IsActive: body.status == 'true' ? StatusEnum.TRUE : StatusEnum.FALSE,
        // user_id: findUser,
      });
      if (!updatedOrder.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Update Order: `,
          updatedOrder,
        );
        throw new HttpException(
          'update Erorr in Order',
          HttpStatus.BAD_REQUEST,
        );
      }

      const createDebt: InsertResult = await DebtsEntity.createQueryBuilder()
        .insert()
        .into(DebtsEntity)
        .values({
          remaining_debt: body.debts.remaining_debt,
          comment: body.debts.comment,
          order_id: findOrder,
          dayGiven: body.debts.dayGiven,
          isActive: StatusEnum.TRUE,
          dayToBeGiven: body.debts.dayToBeGiven,
          user_id: findOrder.user_id,
        })
        .execute()
        .catch((e) => {
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });

      if (!createDebt.raw[0].id) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Insert Debt: `,
          createDebt,
        );
        throw new HttpException('insert Erorr in Debt', HttpStatus.BAD_REQUEST);
      }

      for (let orderProduct of findOrder?.orderProducts) {
        if (orderProduct.product_id.type == TypeProductEnum.COUNT) {
          let currentQuantity =
            +orderProduct.product_id.current_quantity -
            +orderProduct.quantity_sold;
          const updateProductResult: UpdateResult =
            await ProductsEntity.createQueryBuilder()
              .update()
              .set({
                current_quantity: `${currentQuantity}`,
              })
              .where('id = :id', { id: orderProduct.product_id.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!updateProductResult.affected) {
            this.logger.debug(
              `Method: ${methodName} - Product Update Error Count: `,
              updateProductResult,
            );
            throw new HttpException(
              'Product Update Error Count',
              HttpStatus.NOT_FOUND,
            );
          }
        } else if (orderProduct.product_id.type == TypeProductEnum.METR) {
          let currentMeasurement =
            +orderProduct.product_id.current_measurement -
            +orderProduct.measurement_sold;

          const updateProductResult: UpdateResult =
            await ProductsEntity.createQueryBuilder()
              .update()
              .set({
                current_measurement: `${currentMeasurement}`,
              })
              .where('id = :id', { id: orderProduct.product_id.id })
              .execute()
              .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
              });

          if (!updateProductResult.affected) {
            this.logger.debug(
              `Method: ${methodName} - Product Update Error Metr: `,
              updateProductResult,
            );
            throw new HttpException(
              'Product Update Error Metr',
              HttpStatus.NOT_FOUND,
            );
          }
        }
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    const methodName = this.delete;

    try {
      const findDebt = await DebtsEntity.findOneBy({ id }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findDebt) {
        this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
        throw new HttpException('Debt not found', HttpStatus.NOT_FOUND);
      }

      const deleteDebt: DeleteResult = await DebtsEntity.delete({ id });
      if (!deleteDebt.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Delete Debt: `,
          deleteDebt,
        );
        throw new HttpException('delete Erorr in Debt', HttpStatus.BAD_REQUEST);
      }
      return deleteDebt;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
