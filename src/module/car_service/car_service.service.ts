import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCarServiceDto } from './dto/create_car_service.dto';
import { UpdateCarServiceDto } from './dto/update_car_service.dto';

import { DeleteResult, InsertResult, Like, UpdateResult } from 'typeorm';
import { DebtsEntity } from 'src/entities/debt.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { CarServiceEntity } from 'src/entities/car_service.entity';
import { GetCarServiceDto } from './dto/get_car_service.dto';
import { ServiceCarTypeEnum } from 'src/types';

@Injectable()
export class CarServiceServise {
  private logger = new Logger(CarServiceServise.name);

  async findAll(query : GetCarServiceDto) {
    const methodName = this.findAll;

    try {

      let { profit_or_expense ,pageNumber, pageSize} = query
    const offset = (pageNumber - 1) * pageSize;
    if(profit_or_expense !='null') {
      profit_or_expense = profit_or_expense == ServiceCarTypeEnum.PROFIT ? ServiceCarTypeEnum.PROFIT : ServiceCarTypeEnum.EXPENSE
    }

      const [results, total] = await CarServiceEntity.findAndCount({
        where: {
          profit_or_expense : profit_or_expense == 'null' ? null : profit_or_expense,
        },
        relations: {
          user_id: true,
          order_id: true,
        },
        order: {
          create_data: 'desc',
        },
        skip: offset,
        take: pageSize,
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
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
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
    const methodName = this.findOne.name;
    try {
      const findCarService = await CarServiceEntity.findOne({
        where: { id },
        relations: {
          user_id: true,
          order_id: true,
        },  }).catch(
        (e) => {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        },
      );
      if (!findCarService) {
        this.logger.debug(
          `Method: ${methodName} - Car Service Not Found: `,
          findCarService,
        );
        throw new HttpException('Car Service not found', HttpStatus.NOT_FOUND);
      }
      return findCarService;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: CreateCarServiceDto) {
    const methodName = this.create;
    try {
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

      const createCarService: InsertResult =
        await CarServiceEntity.createQueryBuilder()
          .insert()
          .into(CarServiceEntity)
          .values({
            profit_or_expense: body.profit_or_expense == ServiceCarTypeEnum.PROFIT ? ServiceCarTypeEnum.PROFIT : ServiceCarTypeEnum.EXPENSE,
            price: body.price,
            comment: body.comment,
            order_id: null,
            user_id: findUser,
          })
          .execute()
          .catch((e) => {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
          });

      if (!createCarService.raw[0].id) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Insert Car Service: `,
          createCarService,
        );
        throw new HttpException(
          'insert Erorr in Car Service',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        message: 'create Car Service',
      };
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, body: UpdateCarServiceDto) {
    const methodName = this.update;

    try {
      const findCarService = await CarServiceEntity.findOne({
        where: { id },
      });

      if (!findCarService) {
        this.logger.debug(
          `Method: ${methodName} - Car Service Not Found: `,
          findCarService,
        );
        throw new HttpException('Car Service not found', HttpStatus.NOT_FOUND);
      }

      let findUser = findCarService?.user_id;

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

      const updatedCarService: UpdateResult = await CarServiceEntity.update(
        id,
        {
          profit_or_expense:
            body.profit_or_expense == ServiceCarTypeEnum.PROFIT ? ServiceCarTypeEnum.PROFIT : ServiceCarTypeEnum.EXPENSE || findCarService.profit_or_expense,
          price: body.price || findCarService.price,
          comment: body.comment || findCarService.comment,
          order_id: null,
          user_id: findUser,
        },
      );
      if (!updatedCarService.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Update Car Service: `,
          updatedCarService,
        );
        throw new HttpException(
          'update Erorr in Car Service',
          HttpStatus.BAD_REQUEST,
        );
      }

      return updatedCarService;
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
      const findCarService = await CarServiceEntity.findOneBy({ id }).catch(
        () => {
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        },
      );

      if (!findCarService) {
        this.logger.debug(
          `Method: ${methodName} - Car Service Not Found: `,
          findCarService,
        );
        throw new HttpException('Car Service not found', HttpStatus.NOT_FOUND);
      }

      const deleteCarService: DeleteResult = await CarServiceEntity.delete({
        id,
      });
      if (!deleteCarService.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Delete Car Service: `,
          deleteCarService,
        );
        throw new HttpException(
          'delete Erorr in Car Service',
          HttpStatus.BAD_REQUEST,
        );
      }
      return deleteCarService;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
