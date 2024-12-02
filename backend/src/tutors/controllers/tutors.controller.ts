import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TutorsService } from '../providers/tutors.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { UpdateTutorDto } from '../dto/update-tutor.dto';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Post('signup')
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsService.create(createTutorDto);
  }

  @Get()
  findAll() {
    return this.tutorsService.findAll();
  }

  @Get('user/:userId')
  findOne(@Param('userId') userId: string) {
    return this.tutorsService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorsService.update(+id, updateTutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorsService.remove(+id);
  }
}
