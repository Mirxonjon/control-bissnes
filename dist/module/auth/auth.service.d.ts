/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { SingInUserDto } from './dto/sign_in-user.dto';
import { GetUserDto } from './dto/get_user.dto';
export declare class AuthServise {
    private readonly jwtServise;
    constructor(jwtServise: JwtService);
    private logger;
    createUser(createUser: CreateUserDto, image: Express.Multer.File): Promise<void>;
    updateUser(id: string, body: CreateUserDto, image: Express.Multer.File): Promise<void>;
    signIn(signInDto: SingInUserDto): Promise<{
        message: string;
        role: string;
        token: string;
    }>;
    findOne(id: string): Promise<UsersEntity>;
    getAllUsers(query: GetUserDto): Promise<{
        results: UsersEntity[];
        pagination: {
            currentPage: number;
            totalPages: number;
            pageSize: number;
            totalItems: number;
        };
    }>;
    getOne(id: string): Promise<UsersEntity>;
    deleteControlUser(id: string): Promise<void>;
    validateUser(id: string, pass: string): Promise<any>;
    sign(id: string, role: string, password: string): string;
    verify(token: string): Promise<any>;
}
