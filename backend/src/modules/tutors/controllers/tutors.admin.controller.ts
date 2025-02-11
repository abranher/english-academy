import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TutorsAdminService } from '../providers/tutors.admin.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { UpdateTutorDto } from '../dto/update-tutor.dto';

@Controller('admin/tutors')
export class TutorsAdminController {
  constructor(private readonly tutorsAdminService: TutorsAdminService) {}

  @Post('signup/email')
  createEmail(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsAdminService.createEmail(createTutorDto);
  }

  @Post('signup/:userId/password')
  createPassword(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsAdminService.createPassword(createTutorDto, userId);
  }

  @Post('signup/:userId/names')
  createNames(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsAdminService.createNames(createTutorDto, userId);
  }

  @Post('signup/:userId/username')
  createUsername(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsAdminService.createUsername(createTutorDto, userId);
  }

  @Post('signup/:userId/birth')
  createBirth(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsAdminService.createBirth(createTutorDto, userId);
  }

  @Get()
  findAll() {
    return this.tutorsAdminService.findAll();
  }

  @Get('user/:userId')
  findOne(@Param('userId') userId: string) {
    return this.tutorsAdminService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorsAdminService.update(+id, updateTutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorsAdminService.remove(+id);
  }
}
