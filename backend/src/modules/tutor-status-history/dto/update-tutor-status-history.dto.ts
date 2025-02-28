import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorStatusHistoryDto } from './create-tutor-status-history.dto';

export class UpdateTutorStatusHistoryDto extends PartialType(CreateTutorStatusHistoryDto) {}
