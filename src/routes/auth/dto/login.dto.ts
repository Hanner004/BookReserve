import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'testing@book.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  email: string;
  @ApiProperty({ example: 'Qwerty123*' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
