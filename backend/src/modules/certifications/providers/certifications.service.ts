import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/providers/prisma.service';
import { CreateCertificationDto } from '../dto/create-certification.dto';
import { TutorsService } from 'src/modules/tutors/providers/tutors.service';

@Injectable()
export class CertificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tutorService: TutorsService,
  ) {}

  private async findTutorOrThrow(userId: string) {
    const tutor = await this.tutorService.findUserById(userId);
    if (!tutor) throw new NotFoundException('Tutor no encontrado');
    return tutor;
  }

  async createCertification(
    userId: string,
    fileName: string,
    createCertificationDto: CreateCertificationDto,
  ) {
    try {
      const tutor = await this.findTutorOrThrow(userId);

      await this.prisma.certification.create({
        data: {
          url: fileName,
          name: createCertificationDto.name,
          issuingOrganization: createCertificationDto.issuingOrganization,
          tutor: {
            connect: { id: tutor.id },
          },
        },
      });

      return { message: 'Certificación creada con éxito!' };
    } catch (error) {
      throw new NotFoundException('Error al crear la certificación');
    }
  }

  async getCertificationsByTutor(userId: string) {
    const tutor = await this.prisma.tutor.findUnique({
      where: { userId },
      include: { certifications: true },
    });

    if (!tutor) {
      throw new NotFoundException('Tutor no encontrado');
    }

    return tutor.certifications;
  }

  remove(id: number) {
    return `This action removes a #${id} certification`;
  }
}
