import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import messages from 'libs/validations/messages';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3, messages.min)
  @MaxLength(100, messages.max)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3, messages.min)
  @MaxLength(100, messages.max)
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(5, messages.min)
  @MaxLength(40, messages.max)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(8, messages.min)
  password: string;
}
