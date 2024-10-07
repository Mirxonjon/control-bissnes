import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CarServiceServise } from './car_service.service';
import {
  CreateCarServiceSwaggerBodyDto,
  CreateCarServiceDto,
} from './dto/create_car_service.dto';
import {
  UpdateCarServiceSwaggerBodyDto,
  UpdateCarServiceDto,
} from './dto/update_car_service.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { type } from 'os';
import { GetCarServiceDto } from './dto/get_car_service.dto';
@Controller('car-service')
@ApiTags('Car Service')
@ApiBearerAuth('JWT-auth')
export class CarServiceController {
  readonly #_service: CarServiceServise;
  constructor(service: CarServiceServise) {
    this.#_service = service;
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall(@Query() query :GetCarServiceDto) {
    return await this.#_service.findAll(query);
  }

  @Get('/one/:id')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findOne(@Param('id') id: string) {
    return await this.#_service.findOne(id);
  }

  // @UseGuards(jwtGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateCarServiceSwaggerBodyDto })
  @ApiOperation({ description: 'Create Product with role' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createProductDto: CreateCarServiceDto) {
    return await this.#_service.create(createProductDto);
  }

  // @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateCarServiceSwaggerBodyDto })
  // @ApiOperation({ summary: 'Update with role' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateCarServiceDto,
  ) {
    await this.#_service.update(id, updateProductDto);
  }

  // @UseGuards(jwtGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.delete(id);
  }
}
