import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductCategoriesService } from './categries_product.service';
import {
  CreateCategoryProductSwaggerBodyDto,
  CreateOrganizationCategoryDto,
} from './dto/create_categries_product.dto';
import {
  UpdateCategoryProductSwaggerBodyDto,
  UpdateCategoryProductDto,
} from './dto/update_categries_product.dto';
import { RequiredRoles } from '../auth/guards/roles.decorator';
import { RolesEnum } from 'src/types';
import { GetCategoriesProductDto } from './dto/get_categries_product.dto';

// @ApiTags('role')
// @ApiBearerAuth('JWT-auth')
// @UseGuards(RolesGuard)
// @Controller('api/role')
@Controller('product-categories')
@ApiTags('Product categories')
@ApiBearerAuth('JWT-auth')
export class ProductCategoriesController {
  readonly #_service: ProductCategoriesService;
  constructor(service: ProductCategoriesService) {
    this.#_service = service;
  }

  @Get('/all-with-sort')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall(
    @Query() query: GetCategoriesProductDto
  ) {
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
  @ApiBody({ type: CreateCategoryProductSwaggerBodyDto })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(
    @Body() createOrganizationCategoryDto: CreateOrganizationCategoryDto,
  ) {
    return await this.#_service.create(createOrganizationCategoryDto);
  }

  // @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateCategoryProductSwaggerBodyDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateCategoryProductDto: UpdateCategoryProductDto,
  ) {
    return await this.#_service.update(id, updateCategoryProductDto);
  }

  // @UseGuards(jwtGuard)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.#_service.delete(id);
  }
}
