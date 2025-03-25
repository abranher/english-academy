import { PartialType } from '@nestjs/mapped-types';
import { CreateClassProgressDto } from './create-class-progress.dto';

export class UpdateClassProgressDto extends PartialType(CreateClassProgressDto) {}
