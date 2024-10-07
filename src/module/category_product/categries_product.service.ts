import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrganizationCategoryDto } from './dto/create_categries_product.dto';
import { UpdateCategoryProductDto } from './dto/update_categries_product.dto';
import { DeleteResult, ILike, InsertResult, Like, UpdateResult } from 'typeorm';
import { ProductCategoriesEntity } from 'src/entities/product_Categories.entity';
import { GetCategoriesProductDto } from './dto/get_categries_product.dto';
@Injectable()
export class ProductCategoriesService {
  private logger = new Logger(ProductCategoriesService.name);

  async findAll(query :GetCategoriesProductDto) {
    const methodName = this.findAll;
    try {
    const { title  , pageNumber ,pageSize} = query
    const offset = (pageNumber - 1) * pageSize;
      const [results, total] =
        await ProductCategoriesEntity.findAndCount({
          where: {
            title : title == 'null' ? null : ILike(`%${title}%`) ,
          },
          order: {
            create_data: 'desc',
          },
          skip: offset,
          take: pageSize,
        }).catch((e) => {
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
        });
        const totalPages = Math.ceil(total / pageSize);
  
        return {
          results,
          pagination: {
            currentPage: pageNumber,
            totalPages,
            pageSize,
            totalItems: total,
          },
        };
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error trace: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    const methodName = this.findOne;
    try {
      const findCategory: ProductCategoriesEntity =
        await ProductCategoriesEntity.findOne({
          where: {
            id: id,
          },
          relations:{
            products:true
          }
        });

      if (!findCategory) {
        this.logger.debug(`Method: ${methodName} - Not found: `, findCategory);
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return findCategory;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error trace: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: CreateOrganizationCategoryDto) {
    const methodName = this.create;
    try {
      const findCategory = await ProductCategoriesEntity.findOneBy({
        title: body.title,
      });

      if (findCategory) {
        this.logger.debug(
          `Method: ${methodName} - Category find: `,
          findCategory,
        );
        throw new HttpException(
          'Already created this category',
          HttpStatus.FOUND,
        );
      }
      const createCategory: InsertResult =
        await ProductCategoriesEntity.createQueryBuilder()
          .insert()
          .into(ProductCategoriesEntity)
          .values({
            title: body.title.toLowerCase(),
          })
          .execute();

      if (!createCategory.raw[0].id) {
        this.logger.debug(
          `Method: ${methodName} - Create Category Error : `,
          findCategory,
        );
        throw new HttpException(
          'insert Erorr in category Product',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error trace: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, body: UpdateCategoryProductDto) {
    const methodName = this.update;
    try {
      const findCategory = await ProductCategoriesEntity.findOneBy({
        id: id,
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findCategory) {
        this.logger.debug(
          `Method: ${methodName} - Not found Category: `,
          findCategory,
        );
        throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
      }

      const UpdateCategoryResult: UpdateResult =
        await ProductCategoriesEntity.createQueryBuilder()
          .update(ProductCategoriesEntity)
          .set({
            title: body.title.toLowerCase() || findCategory.title,
          })
          .where({ id })
          .execute()
          .catch(() => {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
          });

      if (!UpdateCategoryResult.affected) {
        this.logger.debug(
          `Method: ${methodName} - Update Category Error : `,
          UpdateCategoryResult,
        );
        throw new HttpException(
          'Update Erorr in Category',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error trace: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
    const methodName = this.delete;
    try {
      const findCategory = await ProductCategoriesEntity.findOneBy({
        id: id,
      }).catch(() => {
        throw new HttpException('Not found Category', HttpStatus.BAD_REQUEST);
      });

      if (!findCategory) {
        this.logger.debug(
          `Method: ${methodName} - Not found Category: `,
          findCategory,
        );
        throw new HttpException('Not found Category', HttpStatus.NOT_FOUND);
      }

      const deleteCategoryResult: DeleteResult =
        await ProductCategoriesEntity.createQueryBuilder()
          .delete()
          .from(ProductCategoriesEntity)
          .where({ id })
          .execute();

      if (!deleteCategoryResult.affected) {
        this.logger.debug(
          `Method: ${methodName} - Delete Category Error : `,
          deleteCategoryResult,
        );
        throw new HttpException(
          'Delete Erorr in Category',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error trace: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
