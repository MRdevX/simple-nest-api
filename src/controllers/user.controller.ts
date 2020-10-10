import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common'
import { UserService } from '../services'
import { UserRO } from '../helpers/interfaces'
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '../helpers/dto'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { User } from '../helpers/decorators'
import { ValidationPipe } from '../validations/validation.pipe'

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('user')
    async findMe(@User('email') email: string): Promise<UserRO> {
        return await this.userService.findByEmail(email)
    }

    @Put('user')
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
        return await this.userService.update(userId, userData)
    }

    @UsePipes(new ValidationPipe())
    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
        return this.userService.create(userData)
    }

    @Delete('users/:email')
    async delete(@Param() params) {
        return await this.userService.delete(params.email)
    }

    @UsePipes(new ValidationPipe())
    @Post('users/login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(loginUserDto)

        const errors = { User: ' not found' }
        if (!_user) throw new HttpException({ errors }, 401)

        const token = await this.userService.generateJWT(_user)
        const { email, username } = _user
        const user = { email, token, username }
        return { user }
    }
}
