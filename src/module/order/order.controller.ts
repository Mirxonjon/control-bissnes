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
import { OrderServise } from './order.service';
import { CreateOrderDto } from './dto/create_order.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update_order.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { GetOrderDto, GetStatistikDto } from './dto/get_order_dto';
import { RequiredRoles } from '../auth/guards/roles.decorator';
import { RolesEnum } from 'src/types';
@Controller('order')
@ApiTags('Order')
@ApiBearerAuth('JWT-auth')
export class OrdersController {
  readonly #_service: OrderServise;
  constructor(service: OrderServise) {
    this.#_service = service;
  }
  @RequiredRoles(RolesEnum.ADMIN)
  @Get('/statistic')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async getStatistic(@Query() query: GetStatistikDto) {
    return await this.#_service.getStatistic(query);
  }

  @RequiredRoles(RolesEnum.USER)
  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall(@Query() query: GetOrderDto) {
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
  @RequiredRoles(RolesEnum.USER)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateOrderDto })
  @ApiOperation({ description: 'Create Order with role' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.#_service.create(createOrderDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.USER)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateOrderDto })
  @ApiOperation({ summary: 'Update with role' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateOrderDto,
  ) {
    await this.#_service.update(id, updateProductDto);
  }
  @RequiredRoles(RolesEnum.USER)
  @Patch('/update-status/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateOrderStatusDto })
  @ApiOperation({ summary: 'Update with role' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    await this.#_service.updateStatus(id, updateOrderStatusDto);
  }

  // @UseGuards(jwtGuard)
  @RequiredRoles(RolesEnum.USER)
  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.#_service.delete(id);
  }
}
