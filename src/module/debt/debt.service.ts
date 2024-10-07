import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateDebtDto } from './dto/create_debt.dto';
import { UpdateDebtDto } from './dto/update_debt.dto';

import { DeleteResult, InsertResult, Like, UpdateResult } from 'typeorm';
import { DebtsEntity } from 'src/entities/debt.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { GetUDebtDto } from './dto/get_debt.dto';

@Injectable()
export class DebtServise {
  private logger = new Logger(DebtServise.name);

  async findAll(query : GetUDebtDto) {
    const methodName = this.findAll;
    
    try {
      const {pageNumber, pageSize} = query
    const offset = (pageNumber - 1) * pageSize;

      const [results, total] = await DebtsEntity.findAndCount({
        relations: {
          user_id: true,
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
      const findDebt = await DebtsEntity.findOne({
        where :{ id },
        relations : {
          user_id: true,
          order_id: true,
        }
      }).catch((e) => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      if (!findDebt) {
        this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
        throw new HttpException('Debt not found', HttpStatus.NOT_FOUND);
      }
      return findDebt;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(body: CreateDebtDto) {
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

      const createDebt: InsertResult = await DebtsEntity.createQueryBuilder()
        .insert()
        .into(DebtsEntity)
        .values({
          remaining_debt: body.remaining_debt,
          isActive: body.isActive,
          comment: body.comment,
          dayToBeGiven: body.dayToBeGiven,
          dayGiven: body.dayGiven,
          order_id: null,
          user_id: findUser,
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
        throw new HttpException(
          'insert Erorr in Product',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        message: 'create debt',
      };
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async update(id: string, body: UpdateDebtDto) {
    const methodName = this.update;

    try {
      const findDebt = await DebtsEntity.findOne({
        where: { id },
      });

      if (!findDebt) {
        this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
        throw new HttpException('Debt not found', HttpStatus.NOT_FOUND);
      }

      let findUser = findDebt?.user_id;

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

      const updatedDebt: UpdateResult = await DebtsEntity.update(id, {
        remaining_debt: body.remaining_debt || findDebt.remaining_debt,
        isActive: body.isActive || findDebt.isActive,
        comment: body.comment || findDebt.comment,
        dayToBeGiven: body.dayToBeGiven || findDebt.dayToBeGiven,
        dayGiven: body.dayGiven || findDebt.dayGiven,
        order_id: null,
        user_id: findUser,
      });
      if (!updatedDebt.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Update Debt: `,
          updatedDebt,
        );
        throw new HttpException('update Erorr in Debt', HttpStatus.BAD_REQUEST);
      }

      return updatedDebt;
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
