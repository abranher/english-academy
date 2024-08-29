import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
