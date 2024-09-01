import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import messages from 'libs/validations/messages';

export class CreateUserDto {
  @IsString()
  @MinLength(3, messages.min)
  @MaxLength(100, messages.max)
  name: string;

  @IsString()
  @MinLength(3, messages.min)
  @MaxLength(100, messages.max)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, messages.min)
  @MaxLength(40, messages.max)
  username: string;

  @IsString()
  @MinLength(8, messages.min)
  password: string;
}
