import {
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  Get,
  Query,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthServise } from './auth.service';
import { Controller } from '@nestjs/common';
import { CreateUserDto, CreateUserSwaggerBodyDto } from './dto/create_user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  SingInUserDto,
  SingInUserSwaggerBodyDto,
} from './dto/sign_in-user.dto';
import { RequiredRoles } from './guards/roles.decorator';
import { RolesEnum } from 'src/types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetUserDto } from './dto/get_user.dto';

@Controller('Auth')
@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
export class AuthController {
  constructor(private readonly service: AuthServise) {}

  @Post('/user/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserSwaggerBodyDto })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  register(
    @Body() body: CreateUserDto,
    @UploadedFiles() file: { image?: Express.Multer.File },
  ) {
    return this.service.createUser(body, file?.image ? file?.image[0] : null);
  }

  @Patch('/user/update/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserSwaggerBodyDto })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  updateuser(
    @Param('id') id: string,
    @Body() body: CreateUserDto,
    @UploadedFiles() file: { image?: Express.Multer.File },
  ) {
    return this.service.updateUser(
      id,
      body,
      file?.image ? file?.image[0] : null,
    );
  }

  @Post('user/signIn')
  @HttpCode(HttpStatus.OK)
  @ApiBody({type :SingInUserDto})
  signIn(@Body() body: SingInUserDto) {
    return this.service.signIn(body);
  }

  @Get('getUser/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @ApiOperation({ summary: 'write role or null' })
  async findall(
    @Query() query: GetUserDto
  ) {
    return await this.service.getAllUsers(query);
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @RequiredRoles(RolesEnum.ADMIN)
  @Delete('/deleteUser/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async deleteControlUser(@Param('id') id: string): Promise<void> {
    await this.service.deleteControlUser(id);
  }
}
