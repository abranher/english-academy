import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { TutorsService } from '../providers/tutors.service';
import { CreateTutorDto } from '../dto/create-tutor.dto';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { UpdateTutorDto } from '../dto/update-tutor.dto';
import { UpdateTutorBioDto } from '../dto/update-tutor-bio.dto';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) {}

  /*
   * @Post()
   */

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

  /*
   * @Get()
   */

  @Get()
  findAll() {
    return this.tutorsService.findAll();
  }

  @Get('user/:userId')
  findOne(@Param('userId') userId: string) {
    return this.tutorsService.findOne(userId);
  }

  @Get('user/:userId/certifications')
  async findOneWithCertifications(@Param('userId') userId: string) {
    return await this.tutorsService.findOneWithCertifications(userId);
  }

  /*
   * @Pacth()
   */

  @Patch(':userId/user/profile')
  updateTutorProfile(
    @Body() updateTutorDto: UpdateTutorDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.updateTutorProfile(userId, updateTutorDto);
  }

  @Patch(':userId/user/bio')
  updateTutorBio(
    @Body() updateTutorBioDto: UpdateTutorBioDto,
    @Param('userId') userId: string,
  ) {
    return this.tutorsService.updateTutorBio(userId, updateTutorBioDto);
  }
}
