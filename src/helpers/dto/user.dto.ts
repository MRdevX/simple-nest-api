import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly username: string

    @IsNotEmpty()
    @ApiProperty()
    readonly email: string

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string
}

export class LoginUserDto {
    @IsNotEmpty()
    @ApiProperty()
    readonly email: string

    @IsNotEmpty()
    @ApiProperty()
    readonly password: string
}

export class UpdateUserDto {
    readonly username: string
    readonly email: string
    readonly bio: string
    readonly image: string
}
