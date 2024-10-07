/// <reference types="multer" />
import { AuthServise } from './auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { SingInUserDto } from './dto/sign_in-user.dto';
import { GetUserDto } from './dto/get_user.dto';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthServise);
    register(body: CreateUserDto, file: {
        image?: Express.Multer.File;
    }): Promise<void>;
    updateuser(id: string, body: CreateUserDto, file: {
        image?: Express.Multer.File;
    }): Promise<void>;
    signIn(body: SingInUserDto): Promise<{
        message: string;
        role: string;
        token: string;
    }>;
    findall(query: GetUserDto): Promise<{
        results: import("../../entities/users.entity").UsersEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    findOne(id: string): Promise<import("../../entities/users.entity").UsersEntity>;
    deleteControlUser(id: string): Promise<void>;
}
