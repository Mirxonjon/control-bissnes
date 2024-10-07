"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var AuthServise_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServise = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_entity_1 = require("../../entities/users.entity");
const typeorm_1 = require("typeorm");
const videoAndImageFormat_1 = require("../../utils/videoAndImageFormat");
const path_1 = require("path");
const google_cloud_1 = require("../../utils/google_cloud");
const types_1 = require("../../types");
let AuthServise = AuthServise_1 = class AuthServise {
    constructor(jwtServise) {
        this.jwtServise = jwtServise;
        this.logger = new common_1.Logger(AuthServise_1.name);
    }
    async createUser(createUser, image) {
        const methodName = this.createUser;
        try {
            const findUser = await users_entity_1.UsersEntity.findOne({
                where: {
                    phone: createUser.phone,
                },
            }).catch((e) => {
                throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
            });
            if (findUser) {
                this.logger.debug(`Method: ${methodName} - Error find User: `, findUser);
                throw new common_1.HttpException('phone number alredy registered', common_1.HttpStatus.FOUND);
            }
            let formatImage = 'Not image';
            if (image) {
                formatImage = (0, path_1.extname)(image.originalname).toLowerCase();
            }
            if (videoAndImageFormat_1.allowedImageFormats.includes(formatImage) ||
                formatImage === 'Not image') {
                let image_link = null;
                if (formatImage !== 'Not image') {
                    image_link = (0, google_cloud_1.googleCloud)(image);
                }
                const InserUserResult = await users_entity_1.UsersEntity.createQueryBuilder()
                    .insert()
                    .into(users_entity_1.UsersEntity)
                    .values({
                    first_name: createUser.first_name,
                    name: createUser.name,
                    last_name: createUser.last_name,
                    phone: createUser.phone,
                    img: image_link,
                    comment: createUser.comment,
                    password: createUser.password,
                    role: createUser.role == 'user' ? types_1.RolesEnum.USER : types_1.RolesEnum.ADMIN,
                })
                    .returning(['id', 'role', 'password'])
                    .execute()
                    .catch((e) => {
                    throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
                });
                if (!InserUserResult.raw[0].id) {
                    this.logger.debug(`Method: ${methodName} - Erorr Insert User: `, InserUserResult);
                    throw new common_1.HttpException('insert Erorr in User', common_1.HttpStatus.BAD_REQUEST);
                }
                return;
            }
            else {
                this.logger.debug(`Method: ${methodName} - Error formatImage: `, formatImage);
                throw new common_1.HttpException('Image should be in the format jpg, png, jpeg, pnmj, svg', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, body, image) {
        const methodName = this.updateUser;
        try {
            const findUser = await users_entity_1.UsersEntity.findOne({
                where: {
                    id: id,
                },
            }).catch((e) => {
                throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findUser) {
                this.logger.debug(`Method: ${methodName} - Error not found User: `, findUser);
                throw new common_1.HttpException('not found User', common_1.HttpStatus.FOUND);
            }
            let formatImage = 'Not image';
            if (image) {
                formatImage = (0, path_1.extname)(image.originalname).toLowerCase();
            }
            if (videoAndImageFormat_1.allowedImageFormats.includes(formatImage) ||
                formatImage === 'Not image') {
                let image_link = findUser.img;
                if (formatImage !== 'Not image') {
                    image_link = (0, google_cloud_1.googleCloud)(image);
                }
                const updatedUserResult = await users_entity_1.UsersEntity.update(id, {
                    first_name: body.first_name || findUser.first_name,
                    name: body.name || findUser.name,
                    last_name: body.last_name || findUser.last_name,
                    phone: body.phone || findUser.phone,
                    img: image_link,
                    comment: body.comment || findUser.comment,
                    password: body.password || findUser.password,
                    role: body.role == 'user' ? types_1.RolesEnum.USER : types_1.RolesEnum.ADMIN || findUser.role,
                }).catch((e) => {
                    throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
                });
                if (!updatedUserResult.affected) {
                    this.logger.debug(`Method: ${methodName} - Erorr Update User: `, updatedUserResult);
                    throw new common_1.HttpException('Update Erorr in User', common_1.HttpStatus.BAD_REQUEST);
                }
                return;
            }
            else {
                this.logger.debug(`Method: ${methodName} - Error formatImage: `, formatImage);
                throw new common_1.HttpException('Image should be in the format jpg, png, jpeg, pnmj, svg', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signIn(signInDto) {
        const methodName = this.signIn;
        try {
            console.log(signInDto);
            const finduser = await users_entity_1.UsersEntity.findOne({
                where: {
                    phone: signInDto.phone,
                    password: signInDto.password,
                },
            }).catch((e) => {
                throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!finduser) {
                this.logger.debug(`Method: ${methodName} - Error not found: `, finduser);
                throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
            }
            return {
                message: 'successfully sing In',
                role: finduser.role,
                token: this.sign(finduser.id, finduser.role, finduser.password),
            };
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const methodName = this.findOne;
        try {
            const finduser = await users_entity_1.UsersEntity.findOne({
                where: {
                    id: id,
                },
            }).catch(() => {
                throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!finduser) {
                this.logger.debug(`Method: ${methodName} - Error not found: `, finduser);
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            }
            return finduser;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUsers(query) {
        const { phone, role, pageNumber, pageSize } = query;
        const methodName = this.getAllUsers;
        try {
            const offset = (pageNumber - 1) * pageSize;
            const [results, total] = await users_entity_1.UsersEntity.findAndCount({
                where: {
                    phone: phone == 'null' ? null : (0, typeorm_1.ILike)(`%${phone}%`),
                    role: role == 'null' ? null : role,
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
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(id) {
        const methodName = this.getAllUsers;
        try {
            const findUser = await users_entity_1.UsersEntity.findOne({
                where: {
                    id
                },
                relations: {
                    orders: true,
                    debts: true,
                    carServices: true,
                }
            }).catch((e) => {
                throw new common_1.HttpException('Bad Request ', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findUser) {
                this.logger.debug(`Method: ${methodName} - Not Found User`, findUser);
                throw new common_1.HttpException(`Not Found  User`, common_1.HttpStatus.NOT_FOUND);
            }
            return findUser;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteControlUser(id) {
        const methodName = this.deleteControlUser;
        try {
            const findControlUser = await users_entity_1.UsersEntity.findOne({
                where: { id },
            }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (!findControlUser) {
                this.logger.debug(`Method: ${methodName} - Error not found: `, findControlUser);
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const deleteUserResult = await users_entity_1.UsersEntity.delete({ id });
            if (!deleteUserResult.affected) {
                this.logger.debug(`Method: ${methodName} - Erorr Delete User: `, deleteUserResult);
                throw new common_1.HttpException('Delete Erorr in User', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateUser(id, pass) {
        const methodName = this.validateUser;
        try {
            const user = await users_entity_1.UsersEntity.findOne({
                where: { id },
            }).catch(() => {
                throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
            });
            if (user && user.password === pass) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            return null;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.toString(), common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    sign(id, role, password) {
        return this.jwtServise.sign({ id, role, password });
    }
    async verify(token) {
        const methodName = this.verify;
        try {
            const verifytoken = await this.jwtServise
                .verifyAsync(token)
                .catch((e) => {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            });
            return verifytoken;
        }
        catch (error) {
            this.logger.debug(`Method: ${methodName} - Error: `, error);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthServise = AuthServise_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthServise);
exports.AuthServise = AuthServise;
//# sourceMappingURL=auth.service.js.map