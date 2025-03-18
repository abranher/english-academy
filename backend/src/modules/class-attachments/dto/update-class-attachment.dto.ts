import { PartialType } from '@nestjs/mapped-types';
import { CreateClassAttachmentDto } from './create-class-attachment.dto';

export class UpdateClassAttachmentDto extends PartialType(CreateClassAttachmentDto) {}
