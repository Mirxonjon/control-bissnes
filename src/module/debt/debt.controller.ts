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
import { DebtServise } from './debt.service';
import { CreateDebtSwaggerBodyDto, CreateDebtDto } from './dto/create_debt.dto';
import { UpdateDebtSwaggerBodyDto, UpdateDebtDto } from './dto/update_debt.dto';
import { jwtGuard } from '../auth/guards/jwt.guard';
import { GetUDebtDto } from './dto/get_debt.dto';
@Controller('debt')
@ApiTags('Debt')
@ApiBearerAuth('JWT-auth')
export class DebtsController {
  readonly #_service: DebtServise;
  constructor(service: DebtServise) {
    this.#_service = service;
  }

  @Get('/all')
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse()
  async findall(@Query() query: GetUDebtDto ) {
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
  @ApiBody({ type: CreateDebtSwaggerBodyDto })
  @ApiOperation({ description: 'Create Product with role' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createProductDto: CreateDebtDto) {
    return await this.#_service.create(createProductDto);
  }

  // @UseGuards(jwtGuard)
  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UpdateDebtSwaggerBodyDto })
  @ApiOperation({ summary: 'Update with role' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateDebtDto,
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
