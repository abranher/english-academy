import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from '../providers/students.service';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('signup/email')
  createEmail(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createEmail(createStudentDto);
  }

  @Post('signup/:userId/password')
  createPassword(
    @Body() createStudentDto: CreateStudentDto,
    @Param('userId') userId: string,
  ) {
    return this.studentsService.createPassword(createStudentDto, userId);
  }

  @Post('signup/:userId/names')
  createNames(
    @Body() createStudentDto: CreateStudentDto,
    @Param('userId') userId: string,
  ) {
    return this.studentsService.createNames(createStudentDto, userId);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
