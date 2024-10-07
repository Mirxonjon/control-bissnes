import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';

import { DeleteResult, ILike, InsertResult, Like, UpdateResult } from 'typeorm';
import { AuthServise } from '../auth/auth.service';
import { ProductCategoriesEntity } from 'src/entities/product_Categories.entity';
import { ProductsEntity } from 'src/entities/products.entity';
import { StatusEnum } from 'src/types';
import { GetProductDto } from './dto/get_product.dto';

@Injectable()
export class ProductServise {
  private logger = new Logger(ProductServise.name);

  async findAll(query : GetProductDto) {
    const methodName = this.findAll.name;

    try {

      const {searchTitle , searchable_title_id , category_id , pageNumber,pageSize}  = query
    const offset = (pageNumber - 1) * pageSize;
    console.log(searchTitle , searchable_title_id , category_id , pageNumber,pageSize);
    

      const [results, total] = await ProductsEntity.findAndCount({
        where : {
          title : searchTitle == 'null' ? null :  ILike(`%${searchTitle}%`),
          searchable_title_id : searchable_title_id == 'null' ? null : ILike(`%${searchable_title_id}%`),
          category_id : {
            id : category_id == 'null' ? null: category_id,
          },
        },
        relations: {
          category_id: true,
        },
        order: {
          create_data: 'desc',
        },
        skip: offset,
        take: pageSize,
      }).catch((e) => {
        console.log(e);
        
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      const totalPages = Math.ceil(total / pageSize);

      return  {
        results,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          pageSize,
          totalItems: total,
        },
      };;
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
      const findProduct = await ProductsEntity.findOne({
        where : [{
          id: id,
          productItems: {
            order_id: {
              IsActive : '1'
            }
          }
        },{
        id: id
        }
      
      ],
        relations: {
          category_id: true,
          productItems : {
            order_id:true
          }
        },
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      if (!findProduct) {
        this.logger.debug(
          `Method: ${methodName} - Product Not Found: `,
          findProduct,
        );
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return findProduct;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: CreateProductDto) {
    const methodName = this.create;
    try {
      const findProduct = await ProductsEntity.findOne({
        where: {
          searchable_title_id: body.searchable_title_id,
        },
      });

      if (findProduct) {
        this.logger.debug(
          `Method: ${methodName} - Product find: `,
          findProduct,
        );
        throw new HttpException(
          'already create This title search id :',
          HttpStatus.NOT_FOUND,
        );
      }

      const findCategory = await ProductCategoriesEntity.findOne({
        where: {
          id: body.category_id,
        },
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findCategory) {
        this.logger.debug(
          `Method: ${methodName} - Category not found: `,
          findCategory,
        );
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }

      const createProduct: InsertResult =
        await ProductsEntity.createQueryBuilder()
          .insert()
          .into(ProductsEntity)
          .values({
            title: body.title.toLowerCase(),
            type: body.type,
            price: body.price,
            current_measurement: body.current_measurement,
            current_quantity: body.current_quantity,
            total_quantity: body.total_quantity,
            total_measurement: body.total_measurement,
            searchable_title_id: body.searchable_title_id,

            category_id: findCategory,
          })
          .execute()
          .catch((e) => {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
          });

      if (!createProduct.raw[0].id) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Insert Product: `,
          createProduct,
        );
        throw new HttpException(
          'insert Erorr in Product',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        message: 'create Product',
      };
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, body: UpdateProductDto) {
    const methodName = this.update;

    try {
      const findProduct = await ProductsEntity.findOne({
        where: { id },
      });

      if(findProduct.searchable_title_id != body.searchable_title_id && body.searchable_title_id){
        const findProduct = await ProductsEntity.findOne({
          where: {
            searchable_title_id: body.searchable_title_id,
          },
        });
  
        if (findProduct) {
          this.logger.debug(
            `Method: ${methodName} - Product find: `,
            findProduct,
          );
          throw new HttpException(
            'already create This title search id :',
            HttpStatus.NOT_FOUND,
          );
        }
      }


      if (!findProduct) {
        this.logger.debug(
          `Method: ${methodName} - Product Not Found: `,
          findProduct,
        );
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      let findCategory = findProduct?.category_id;

      if (body.category_id != 'null') {
        findCategory = await ProductCategoriesEntity.findOne({
          where: {
            id: body.category_id,
          },
        });

        if (!findCategory) {
          this.logger.debug(
            `Method: ${methodName} - Category Not Found: `,
            findCategory,
          );
          throw new HttpException(' Category Not Found', HttpStatus.NOT_FOUND);
        }
      }

      const updatedProduct: UpdateResult = await ProductsEntity.update(id, {
        title: body?.title?.toLowerCase() || findProduct.title,
        searchable_title_id:
          body.searchable_title_id || findProduct.searchable_title_id,
        type: body.type || findProduct.type,
        price: body.price || findProduct.price,
        current_measurement:
          body.current_measurement || findProduct.current_measurement,
        current_quantity: body.current_quantity || findProduct.current_quantity,
        total_quantity: body.total_quantity || findProduct.total_quantity,
        total_measurement:
          body.total_measurement || findProduct.total_measurement,
        category_id: findCategory,
      });
      if (!updatedProduct.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Update Product: `,
          updatedProduct,
        );
        throw new HttpException(
          'update Erorr in Product',
          HttpStatus.BAD_REQUEST,
        );
      }

      return updatedProduct;
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
      const findProduct = await ProductsEntity.findOneBy({ id }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findProduct) {
        this.logger.debug(
          `Method: ${methodName} - Product Not Found: `,
          findProduct,
        );
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      const deleteProduct: DeleteResult = await ProductsEntity.delete({ id });
      if (!deleteProduct.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Delete Product: `,
          deleteProduct,
        );
        throw new HttpException(
          'delete Erorr in Product',
          HttpStatus.BAD_REQUEST,
        );
      }
      return deleteProduct;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
