"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductServise_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServise = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_Categories_entity_1 = require("../../entities/product_Categories.entity");
const products_entity_1 = require("../../entities/products.entity");
let ProductServise = ProductServise_1 = class ProductServise {
    constructor() {
        this.logger = new common_1.Logger(ProductServise_1.name);
    }
    async findAll(query) {
        const methodName = this.findAll.name;
        try {
            const { searchTitle, searchable_title_id, category_id, pageNumber, pageSize } = query;
            const offset = (pageNumber - 1) * pageSize;
            console.log(searchTitle, searchable_title_id, category_id, pageNumber, pageSize);
            const [results, total] = await products_entity_1.ProductsEntity.findAndCount({
                where: {
                    title: searchTitle == 'null' ? null : (0, typeorm_1.ILike)(`%${searchTitle}%`),
                    searchable_title_id: searchable_title_id == 'null' ? null : (0, typeorm_1.ILike)(`%${searchable_title_id}%`),
                    category_id: {
                        id: category_id == 'null' ? null : category_id,
                    },
                },
                relations: {
                    category_id: true,
                },
                order: {
                    create_data: 'desc',
                },
                skip: offset,
                take: pageSize,
            }).catch((e) => {
                console.log(e);
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
            ;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const methodName = this.findOne;
        try {
            const findProduct = await products_entity_1.ProductsEntity.findOne({
                where: [{
                        id: id,
                        productItems: {
                            order_id: {
                                IsActive: '1'
                            }
                        }
                    }, {
                        id: id
                    }
                ],
                relations: {
                    category_id: true,
                    productItems: {
                        order_id: true
                    }
                },
            }).catch((e) => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findProduct) {
                this.logger.debug(`Method: ${methodName} - Product Not Found: `, findProduct);
                throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
            }
            return findProduct;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(body) {
        const methodName = this.create;
        try {
            const findProduct = await products_entity_1.ProductsEntity.findOne({
                where: {
                    searchable_title_id: body.searchable_title_id,
                },
            });
            if (findProduct) {
                this.logger.debug(`Method: ${methodName} - Product find: `, findProduct);
                throw new common_1.HttpException('already create This title search id :', common_1.HttpStatus.NOT_FOUND);
            }
            const findCategory = await product_Categories_entity_1.ProductCategoriesEntity.findOne({
                where: {
                    id: body.category_id,
                },
            }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findCategory) {
                this.logger.debug(`Method: ${methodName} - Category not found: `, findCategory);
                throw new common_1.HttpException('Category not found', common_1.HttpStatus.NOT_FOUND);
            }
            const createProduct = await products_entity_1.ProductsEntity.createQueryBuilder()
                .insert()
                .into(products_entity_1.ProductsEntity)
                .values({
                title: body.title.toLowerCase(),
                type: body.type,
                price: body.price,
                current_measurement: body.current_measurement,
                current_quantity: body.current_quantity,
                total_quantity: body.total_quantity,
                total_measurement: body.total_measurement,
                searchable_title_id: body.searchable_title_id,
                category_id: findCategory,
            })
                .execute()
                .catch((e) => {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            });
            if (!createProduct.raw[0].id) {
                this.logger.debug(`Method: ${methodName} - Erorr Insert Product: `, createProduct);
                throw new common_1.HttpException('insert Erorr in Product', common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                message: 'create Product',
            };
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, body) {
        var _a;
        const methodName = this.update;
        try {
            const findProduct = await products_entity_1.ProductsEntity.findOne({
                where: { id },
            });
            if (findProduct.searchable_title_id != body.searchable_title_id && body.searchable_title_id) {
                const findProduct = await products_entity_1.ProductsEntity.findOne({
                    where: {
                        searchable_title_id: body.searchable_title_id,
                    },
                });
                if (findProduct) {
                    this.logger.debug(`Method: ${methodName} - Product find: `, findProduct);
                    throw new common_1.HttpException('already create This title search id :', common_1.HttpStatus.NOT_FOUND);
                }
            }
            if (!findProduct) {
                this.logger.debug(`Method: ${methodName} - Product Not Found: `, findProduct);
                throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
            }
            let findCategory = findProduct === null || findProduct === void 0 ? void 0 : findProduct.category_id;
            if (body.category_id != 'null') {
                findCategory = await product_Categories_entity_1.ProductCategoriesEntity.findOne({
                    where: {
                        id: body.category_id,
                    },
                });
                if (!findCategory) {
                    this.logger.debug(`Method: ${methodName} - Category Not Found: `, findCategory);
                    throw new common_1.HttpException(' Category Not Found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            const updatedProduct = await products_entity_1.ProductsEntity.update(id, {
                title: ((_a = body === null || body === void 0 ? void 0 : body.title) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || findProduct.title,
                searchable_title_id: body.searchable_title_id || findProduct.searchable_title_id,
                type: body.type || findProduct.type,
                price: body.price || findProduct.price,
                current_measurement: body.current_measurement || findProduct.current_measurement,
                current_quantity: body.current_quantity || findProduct.current_quantity,
                total_quantity: body.total_quantity || findProduct.total_quantity,
                total_measurement: body.total_measurement || findProduct.total_measurement,
                category_id: findCategory,
            });
            if (!updatedProduct.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Update Product: `, updatedProduct);
                throw new common_1.HttpException('update Erorr in Product', common_1.HttpStatus.BAD_REQUEST);
            }
            return updatedProduct;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        const methodName = this.delete;
        try {
            const findProduct = await products_entity_1.ProductsEntity.findOneBy({ id }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findProduct) {
                this.logger.debug(`Method: ${methodName} - Product Not Found: `, findProduct);
                throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteProduct = await products_entity_1.ProductsEntity.delete({ id });
            if (!deleteProduct.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Delete Product: `, deleteProduct);
                throw new common_1.HttpException('delete Erorr in Product', common_1.HttpStatus.BAD_REQUEST);
            }
            return deleteProduct;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ProductServise = ProductServise_1 = __decorate([
    (0, common_1.Injectable)()
], ProductServise);
exports.ProductServise = ProductServise;
//# sourceMappingURL=product.service.js.map