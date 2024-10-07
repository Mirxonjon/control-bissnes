"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductCategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_Categories_entity_1 = require("../../entities/product_Categories.entity");
let ProductCategoriesService = ProductCategoriesService_1 = class ProductCategoriesService {
    constructor() {
        this.logger = new common_1.Logger(ProductCategoriesService_1.name);
    }
    async findAll(query) {
        const methodName = this.findAll;
        try {
            const { title, pageNumber, pageSize } = query;
            const offset = (pageNumber - 1) * pageSize;
            const [results, total] = await product_Categories_entity_1.ProductCategoriesEntity.findAndCount({
                where: {
                    title: title == 'null' ? null : (0, typeorm_1.ILike)(`%${title}%`),
                },
                order: {
                    create_data: 'desc',
                },
                skip: offset,
                take: pageSize,
            }).catch((e) => {
                throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
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
            this.logger.debug(`Method: ${methodName} - Error trace: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const methodName = this.findOne;
        try {
            const findCategory = await product_Categories_entity_1.ProductCategoriesEntity.findOne({
                where: {
                    id: id,
                },
                relations: {
                    products: true
                }
            });
            if (!findCategory) {
                this.logger.debug(`Method: ${methodName} - Not found: `, findCategory);
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            return findCategory;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error trace: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        const methodName = this.create;
        try {
            const findCategory = await product_Categories_entity_1.ProductCategoriesEntity.findOneBy({
                title: body.title,
            });
            if (findCategory) {
                this.logger.debug(`Method: ${methodName} - Category find: `, findCategory);
                throw new common_1.HttpException('Already created this category', common_1.HttpStatus.FOUND);
            }
            const createCategory = await product_Categories_entity_1.ProductCategoriesEntity.createQueryBuilder()
                .insert()
                .into(product_Categories_entity_1.ProductCategoriesEntity)
                .values({
                title: body.title.toLowerCase(),
            })
                .execute();
            if (!createCategory.raw[0].id) {
                this.logger.debug(`Method: ${methodName} - Create Category Error : `, findCategory);
                throw new common_1.HttpException('insert Erorr in category Product', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error trace: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        const methodName = this.update;
        try {
            const findCategory = await product_Categories_entity_1.ProductCategoriesEntity.findOneBy({
                id: id,
            }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findCategory) {
                this.logger.debug(`Method: ${methodName} - Not found Category: `, findCategory);
                throw new common_1.HttpException('Not found Category', common_1.HttpStatus.NOT_FOUND);
            }
            const UpdateCategoryResult = await product_Categories_entity_1.ProductCategoriesEntity.createQueryBuilder()
                .update(product_Categories_entity_1.ProductCategoriesEntity)
                .set({
                title: body.title.toLowerCase() || findCategory.title,
            })
                .where({ id })
                .execute()
                .catch(() => {
                throw new common_1.HttpException('Bad Request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!UpdateCategoryResult.affected) {
                this.logger.debug(`Method: ${methodName} - Update Category Error : `, UpdateCategoryResult);
                throw new common_1.HttpException('Update Erorr in Category', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error trace: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const methodName = this.delete;
        try {
            const findCategory = await product_Categories_entity_1.ProductCategoriesEntity.findOneBy({
                id: id,
            }).catch(() => {
                throw new common_1.HttpException('Not found Category', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findCategory) {
                this.logger.debug(`Method: ${methodName} - Not found Category: `, findCategory);
                throw new common_1.HttpException('Not found Category', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteCategoryResult = await product_Categories_entity_1.ProductCategoriesEntity.createQueryBuilder()
                .delete()
                .from(product_Categories_entity_1.ProductCategoriesEntity)
                .where({ id })
                .execute();
            if (!deleteCategoryResult.affected) {
                this.logger.debug(`Method: ${methodName} - Delete Category Error : `, deleteCategoryResult);
                throw new common_1.HttpException('Delete Erorr in Category', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error trace: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ProductCategoriesService = ProductCategoriesService_1 = __decorate([
    (0, common_1.Injectable)()
], ProductCategoriesService);
exports.ProductCategoriesService = ProductCategoriesService;
//# sourceMappingURL=categries_product.service.js.map