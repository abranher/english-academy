import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TutorsService } from '../providers/tutors.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { VerifyTokenDto } from '../dto/verify-token.dto';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  @Post('signup/email')
  createEmail(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsService.createEmail(createTutorDto);
  }

  @Post('signup/:userId/verify-email')
  verifyEmail(
    @Body() verifyTokenDto: VerifyTokenDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.verifyEmail(verifyTokenDto, userId);
  }

  @Post('signup/:userId/resend-email')
  resendEmail(@Param('userId') userId: string) {
    return this.tutorsService.resendEmail(userId);
  }

  @Post('signup/:userId/password')
  createPassword(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.createPassword(createTutorDto, userId);
  }

  @Post('signup/:userId/names')
  createNames(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.createNames(createTutorDto, userId);
  }

  @Post('signup/:userId/username')
  createUsername(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.createUsername(createTutorDto, userId);
  }

  @Post('signup/:userId/birth')
  createBirth(
    @Body() createTutorDto: CreateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.createBirth(createTutorDto, userId);
  }

  @Get()
  findAll() {
    return this.tutorsService.findAll();
  }

  @Get('user/:userId')
  findOne(@Param('userId') userId: string) {
    return this.tutorsService.findOne(userId);
  }
}
