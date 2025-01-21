import { Injectable } from '@nestjs/common';
import { CreateBackupDto } from '../dto/create-backup.dto';

@Injectable()
export class BackupService {
  create(createBackupDto: CreateBackupDto) {
    return 'This action adds a new backup';
  }

  findAll() {
    return `This action returns all backup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} backup`;
  }

  remove(id: number) {
    return `This action removes a #${id} backup`;
  }
}
