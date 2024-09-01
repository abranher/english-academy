import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import messages from 'libs/validations/messages';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, messages.min)
  password: string;
}
