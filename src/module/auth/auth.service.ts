import {
  HttpException,
  HttpStatus,
  Injectable,
  Body,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { SingInUserDto } from './dto/sign_in-user.dto';
import { DeleteResult, ILike, InsertResult, UpdateResult } from 'typeorm';
import { allowedImageFormats } from 'src/utils/videoAndImageFormat';
import { extname } from 'path';
import { googleCloud } from 'src/utils/google_cloud';
import { GetUserDto } from './dto/get_user.dto';
import { RolesEnum } from 'src/types';

@Injectable()
export class AuthServise {
  constructor(private readonly jwtServise: JwtService) {}
  private logger = new Logger(AuthServise.name);
  async createUser(createUser: CreateUserDto, image: Express.Multer.File) {
    const methodName = this.createUser;
    try {
      const findUser = await UsersEntity.findOne({
        where: {
          phone: createUser.phone,
        },
      }).catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

      if (findUser) {
        this.logger.debug(
          `Method: ${methodName} - Error find User: `,
          findUser,
        );
        throw new HttpException(
          'phone number alredy registered',
          HttpStatus.FOUND,
        );
      }

      let formatImage: string = 'Not image';

      if (image) {
        formatImage = extname(image.originalname).toLowerCase();
      }

      if (
        allowedImageFormats.includes(formatImage) ||
        formatImage === 'Not image'
      ) {
        let image_link: string = null;

        if (formatImage !== 'Not image') {
          image_link = googleCloud(image);
        }
        const InserUserResult: InsertResult =
          await UsersEntity.createQueryBuilder()
            .insert()
            .into(UsersEntity)
            .values({
              first_name: createUser.first_name,
              name: createUser.name,
              last_name: createUser.last_name,
              phone: createUser.phone,
              img: image_link,
              comment: createUser.comment,
              password: createUser.password,
              role: createUser.role == 'user' ? RolesEnum.USER : RolesEnum.ADMIN ,
            })
            .returning(['id', 'role', 'password'])
            .execute()
            .catch((e) => {
              throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
            });

        if (!InserUserResult.raw[0].id) {
          this.logger.debug(
            `Method: ${methodName} - Erorr Insert User: `,
            InserUserResult,
          );
          throw new HttpException(
            'insert Erorr in User',
            HttpStatus.BAD_REQUEST,
          );
        }
        return;
      } else {
        this.logger.debug(
          `Method: ${methodName} - Error formatImage: `,
          formatImage,
        );
        throw new HttpException(
          'Image should be in the format jpg, png, jpeg, pnmj, svg',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(
    id: string,
    body: CreateUserDto,
    image: Express.Multer.File,
  ) {
    const methodName = this.updateUser;
    try {
      const findUser = await UsersEntity.findOne({
        where: {
          id: id,
        },
      }).catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

      if (!findUser) {
        this.logger.debug(
          `Method: ${methodName} - Error not found User: `,
          findUser,
        );
        throw new HttpException('not found User', HttpStatus.FOUND);
      }

      let formatImage: string = 'Not image';

      if (image) {
        formatImage = extname(image.originalname).toLowerCase();
      }

      if (
        allowedImageFormats.includes(formatImage) ||
        formatImage === 'Not image'
      ) {
        let image_link: string = findUser.img;

        if (formatImage !== 'Not image') {
          image_link = googleCloud(image);
        }
        const updatedUserResult: UpdateResult = await UsersEntity.update(id, {
          first_name: body.first_name || findUser.first_name,
          name: body.name || findUser.name,
          last_name: body.last_name || findUser.last_name,
          phone: body.phone || findUser.phone,
          img: image_link,
          comment: body.comment || findUser.comment,
          password: body.password || findUser.password,
          role: body.role == 'user' ? RolesEnum.USER : RolesEnum.ADMIN || findUser.role,
        }).catch((e) => {
          throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
        });

        if (!updatedUserResult.affected) {
          this.logger.debug(
            `Method: ${methodName} - Erorr Update User: `,
            updatedUserResult,
          );
          throw new HttpException(
            'Update Erorr in User',
            HttpStatus.BAD_REQUEST,
          );
        }
        return;
      } else {
        this.logger.debug(
          `Method: ${methodName} - Error formatImage: `,
          formatImage,
        );
        throw new HttpException(
          'Image should be in the format jpg, png, jpeg, pnmj, svg',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(signInDto: SingInUserDto) {
    const methodName = this.signIn;
    try {
      console.log(signInDto);
      
      const finduser = await UsersEntity.findOne({
        where: {
          phone: signInDto.phone,
          password: signInDto.password,
        },
      }).catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

      if (!finduser) {
        this.logger.debug(
          `Method: ${methodName} - Error not found: `,
          finduser,
        );
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'successfully sing In',
        role: finduser.role,
        token: this.sign(finduser.id, finduser.role, finduser.password),
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
    const methodName = this.findOne;
    try {
      const finduser = await UsersEntity.findOne({
        where: {
          id: id,
        },
      }).catch(() => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });
      if (!finduser) {
        this.logger.debug(
          `Method: ${methodName} - Error not found: `,
          finduser,
        );
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      }

      return finduser;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsers(query :GetUserDto) {
    const { phone,role  , pageNumber ,pageSize} = query
    const methodName = this.getAllUsers;
    try {
      const offset = (pageNumber - 1) * pageSize;

      const [results, total] = await UsersEntity.findAndCount({
        where: {
          phone : phone == 'null' ? null : ILike(`%${phone}%`) ,
          role: role == 'null' ? null : role ,
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
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(id: string) {
    const methodName = this.getAllUsers;
    try {
      const findUser= await UsersEntity.findOne({
      where :{
        id 
      },
      relations :{
        orders : true,
        debts: true,
        carServices :true,

      }
      }).catch((e) => {
        throw new HttpException('Bad Request ', HttpStatus.BAD_REQUEST);
      });

      if(!findUser) {
        this.logger.debug(`Method: ${methodName} - Not Found User`, findUser)
        throw new HttpException(
          `Not Found  User`,
          HttpStatus.NOT_FOUND,
        );
      }

      return findUser;


    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



  async deleteControlUser(id: string) {
    const methodName = this.deleteControlUser;
    try {
      const findControlUser = await UsersEntity.findOne({
        where: { id },
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });

      if (!findControlUser) {
        this.logger.debug(
          `Method: ${methodName} - Error not found: `,
          findControlUser,
        );
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const deleteUserResult: DeleteResult = await UsersEntity.delete({ id });
      if (!deleteUserResult.affected) {
        this.logger.debug(
          `Method: ${methodName} - Erorr Delete User: `,
          deleteUserResult,
        );
        throw new HttpException('Delete Erorr in User', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(id: string, pass: string): Promise<any> {
    const methodName = this.validateUser;
    try {
      const user = await UsersEntity.findOne({
        where: { id },
      }).catch(() => {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      });
      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  sign(id: string, role: string, password: string) {
    return this.jwtServise.sign({ id, role, password });
  }

  async verify(token: string) {
    const methodName = this.verify;
    try {
      const verifytoken = await this.jwtServise
        .verifyAsync(token)
        .catch((e) => {
          // throw new UnauthorizedException(e);
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        });
      return verifytoken;
    } catch (error) {
      this.logger.debug(`Method: ${methodName} - Error: `, error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
