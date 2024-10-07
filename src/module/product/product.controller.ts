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
import { ProductServise } from './product.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  CreateProductSwaggerBodyDto,
  CreateProductDto,
} from './dto/create_product.dto';
import {
  UpdateProductSwaggerBodyDto,
  UpdateProductDto,
} from './dto/update_product.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { GetProductDto } from './dto/get_product.dto';
@Controller('product')
@ApiTags('Products ')
@ApiBearerAuth('JWT-auth')
export class ProductsController {
  readonly #_service: ProductServise;
  constructor(service: ProductServise) {
    this.#_service = service;
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall(@Query() query : GetProductDto) {
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
  @ApiBody({ type: CreateProductSwaggerBodyDto })
  @ApiOperation({ description: 'Create Product with role' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.#_service.create(createProductDto);
  }

  // @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateProductSwaggerBodyDto })
  @ApiOperation({ summary: 'Update with role' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
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
