import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  levelId?: string;
}
