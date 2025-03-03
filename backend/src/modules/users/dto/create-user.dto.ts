import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import messages from 'src/libs/validations/messages';

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
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[.,\-_@$])/, {
    message:
      'La contraseña debe contener al menos una mayúscula, un número y un símbolo (., - _ @ $)',
  })
  password: string;

  @IsOptional()
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida.' })
  birth: string;
}
