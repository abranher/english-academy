import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  levelId?: string;
}
