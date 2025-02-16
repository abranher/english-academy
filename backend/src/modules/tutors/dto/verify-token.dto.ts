import { IsString, MinLength, Matches } from 'class-validator';

export class VerifyTokenDto {
  @IsString({ message: 'El token debe ser una cadena de texto.' })
  @MinLength(6, { message: 'El token debe tener al menos 6 caracteres.' })
  @Matches(/^\d+$/, { message: 'El token debe contener solo números.' })
  token: string;
}
