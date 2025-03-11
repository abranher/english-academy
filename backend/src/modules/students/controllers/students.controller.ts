import { Controller, Post, Body, Param } from '@nestjs/common';

import { StudentsService } from '../providers/students.service';
import { CreateStudentDto } from '../dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('signup/email')
  createEmail(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createEmail(createStudentDto);
  }

  @Post('assign-level/user/:userId')
  assignLevel(
    @Param('userId') userId: string,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.assignLevel(userId, createStudentDto);
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

  @Post('signup/:userId/username')
  createUsername(
    @Body() createStudentDto: CreateStudentDto,
    @Param('userId') userId: string,
  ) {
    return this.studentsService.createUsername(createStudentDto, userId);
  }

  @Post('signup/:userId/birth')
  createBirth(
    @Body() createStudentDto: CreateStudentDto,
    @Param('userId') userId: string,
  ) {
    return this.studentsService.createBirth(createStudentDto, userId);
  }
}
