"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CarServiceServise_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarServiceServise = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("../../entities/users.entity");
const car_service_entity_1 = require("../../entities/car_service.entity");
const types_1 = require("../../types");
let CarServiceServise = CarServiceServise_1 = class CarServiceServise {
    constructor() {
        this.logger = new common_1.Logger(CarServiceServise_1.name);
    }
    async findAll(query) {
        const methodName = this.findAll;
        try {
            let { profit_or_expense, pageNumber, pageSize } = query;
            const offset = (pageNumber - 1) * pageSize;
            if (profit_or_expense != 'null') {
                profit_or_expense = profit_or_expense == types_1.ServiceCarTypeEnum.PROFIT ? types_1.ServiceCarTypeEnum.PROFIT : types_1.ServiceCarTypeEnum.EXPENSE;
            }
            const [results, total] = await car_service_entity_1.CarServiceEntity.findAndCount({
                where: {
                    profit_or_expense: profit_or_expense == 'null' ? null : profit_or_expense,
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
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
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
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const methodName = this.findOne.name;
        try {
            const findCarService = await car_service_entity_1.CarServiceEntity.findOne({
                where: { id },
                relations: {
                    user_id: true,
                    order_id: true,
                },
            }).catch((e) => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findCarService) {
                this.logger.debug(`Method: ${methodName} - Car Service Not Found: `, findCarService);
                throw new common_1.HttpException('Car Service not found', common_1.HttpStatus.NOT_FOUND);
            }
            return findCarService;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        const methodName = this.create;
        try {
            const findUser = await users_entity_1.UsersEntity.findOne({
                where: {
                    id: body.user_id,
                },
            }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findUser) {
                this.logger.debug(`Method: ${methodName} - User not found: `, findUser);
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const createCarService = await car_service_entity_1.CarServiceEntity.createQueryBuilder()
                .insert()
                .into(car_service_entity_1.CarServiceEntity)
                .values({
                profit_or_expense: body.profit_or_expense == types_1.ServiceCarTypeEnum.PROFIT ? types_1.ServiceCarTypeEnum.PROFIT : types_1.ServiceCarTypeEnum.EXPENSE,
                price: body.price,
                comment: body.comment,
                order_id: null,
                user_id: findUser,
            })
                .execute()
                .catch((e) => {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            });
            if (!createCarService.raw[0].id) {
                this.logger.debug(`Method: ${methodName} - Erorr Insert Car Service: `, createCarService);
                throw new common_1.HttpException('insert Erorr in Car Service', common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'create Car Service',
            };
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        const methodName = this.update;
        try {
            const findCarService = await car_service_entity_1.CarServiceEntity.findOne({
                where: { id },
            });
            if (!findCarService) {
                this.logger.debug(`Method: ${methodName} - Car Service Not Found: `, findCarService);
                throw new common_1.HttpException('Car Service not found', common_1.HttpStatus.NOT_FOUND);
            }
            let findUser = findCarService === null || findCarService === void 0 ? void 0 : findCarService.user_id;
            if (body.user_id != 'null') {
                findUser = await users_entity_1.UsersEntity.findOne({
                    where: {
                        id: body.user_id,
                    },
                });
                if (!findUser) {
                    this.logger.debug(`Method: ${methodName} - User Not Found: `, findUser);
                    throw new common_1.HttpException('User Not Found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            const updatedCarService = await car_service_entity_1.CarServiceEntity.update(id, {
                profit_or_expense: body.profit_or_expense == types_1.ServiceCarTypeEnum.PROFIT ? types_1.ServiceCarTypeEnum.PROFIT : types_1.ServiceCarTypeEnum.EXPENSE || findCarService.profit_or_expense,
                price: body.price || findCarService.price,
                comment: body.comment || findCarService.comment,
                order_id: null,
                user_id: findUser,
            });
            if (!updatedCarService.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Update Car Service: `, updatedCarService);
                throw new common_1.HttpException('update Erorr in Car Service', common_1.HttpStatus.BAD_REQUEST);
            }
            return updatedCarService;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const methodName = this.delete;
        try {
            const findCarService = await car_service_entity_1.CarServiceEntity.findOneBy({ id }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findCarService) {
                this.logger.debug(`Method: ${methodName} - Car Service Not Found: `, findCarService);
                throw new common_1.HttpException('Car Service not found', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteCarService = await car_service_entity_1.CarServiceEntity.delete({
                id,
            });
            if (!deleteCarService.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Delete Car Service: `, deleteCarService);
                throw new common_1.HttpException('delete Erorr in Car Service', common_1.HttpStatus.BAD_REQUEST);
            }
            return deleteCarService;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CarServiceServise = CarServiceServise_1 = __decorate([
    (0, common_1.Injectable)()
], CarServiceServise);
exports.CarServiceServise = CarServiceServise;
//# sourceMappingURL=car_service.service.js.map