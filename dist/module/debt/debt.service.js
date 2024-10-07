"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DebtServise_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebtServise = void 0;
const common_1 = require("@nestjs/common");
const debt_entity_1 = require("../../entities/debt.entity");
const users_entity_1 = require("../../entities/users.entity");
let DebtServise = DebtServise_1 = class DebtServise {
    constructor() {
        this.logger = new common_1.Logger(DebtServise_1.name);
    }
    async findAll(query) {
        const methodName = this.findAll;
        try {
            const { pageNumber, pageSize } = query;
            const offset = (pageNumber - 1) * pageSize;
            const [results, total] = await debt_entity_1.DebtsEntity.findAndCount({
                relations: {
                    user_id: true,
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
            const findDebt = await debt_entity_1.DebtsEntity.findOne({
                where: { id },
                relations: {
                    user_id: true,
                    order_id: true,
                }
            }).catch((e) => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findDebt) {
                this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
                throw new common_1.HttpException('Debt not found', common_1.HttpStatus.NOT_FOUND);
            }
            return findDebt;
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
            const createDebt = await debt_entity_1.DebtsEntity.createQueryBuilder()
                .insert()
                .into(debt_entity_1.DebtsEntity)
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
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            });
            if (!createDebt.raw[0].id) {
                this.logger.debug(`Method: ${methodName} - Erorr Insert Debt: `, createDebt);
                throw new common_1.HttpException('insert Erorr in Product', common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'create debt',
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
            const findDebt = await debt_entity_1.DebtsEntity.findOne({
                where: { id },
            });
            if (!findDebt) {
                this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
                throw new common_1.HttpException('Debt not found', common_1.HttpStatus.NOT_FOUND);
            }
            let findUser = findDebt === null || findDebt === void 0 ? void 0 : findDebt.user_id;
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
            const updatedDebt = await debt_entity_1.DebtsEntity.update(id, {
                remaining_debt: body.remaining_debt || findDebt.remaining_debt,
                isActive: body.isActive || findDebt.isActive,
                comment: body.comment || findDebt.comment,
                dayToBeGiven: body.dayToBeGiven || findDebt.dayToBeGiven,
                dayGiven: body.dayGiven || findDebt.dayGiven,
                order_id: null,
                user_id: findUser,
            });
            if (!updatedDebt.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Update Debt: `, updatedDebt);
                throw new common_1.HttpException('update Erorr in Debt', common_1.HttpStatus.BAD_REQUEST);
            }
            return updatedDebt;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const methodName = this.delete;
        try {
            const findDebt = await debt_entity_1.DebtsEntity.findOneBy({ id }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findDebt) {
                this.logger.debug(`Method: ${methodName} - Debt Not Found: `, findDebt);
                throw new common_1.HttpException('Debt not found', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteDebt = await debt_entity_1.DebtsEntity.delete({ id });
            if (!deleteDebt.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Delete Debt: `, deleteDebt);
                throw new common_1.HttpException('delete Erorr in Debt', common_1.HttpStatus.BAD_REQUEST);
            }
            return deleteDebt;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
DebtServise = DebtServise_1 = __decorate([
    (0, common_1.Injectable)()
], DebtServise);
exports.DebtServise = DebtServise;
//# sourceMappingURL=debt.service.js.map