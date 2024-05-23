import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    @HttpCode(201)
    async createUser(@Body('email') email: string) {
        try {
            await this.userService.addUser(email);
            return { message: 'User created successfully' };
        } catch (error) {
            if (error.name === 'ConflictError') {
                throw new HttpException(
                    'User already exists',
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException('bad requests', HttpStatus.BAD_REQUEST);
        }
    }
}
