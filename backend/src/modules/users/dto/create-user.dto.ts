import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { differenceInYears, isAfter, isBefore } from 'date-fns';
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
  @Type(() => Date)
  @IsDate()
  @ValidateIf((_, value) => isBefore(value, new Date()), {
    message: 'La fecha de nacimiento no puede ser en el futuro.',
  })
  @ValidateIf((_, value) => isAfter(value, new Date('1900-01-01')), {
    message: 'La fecha de nacimiento no puede ser anterior a 1900.',
  })
  @ValidateIf((_, value) => differenceInYears(new Date(), value) >= 18, {
    message: 'Debes tener al menos 18 años.',
  })
  birth: Date;
}
