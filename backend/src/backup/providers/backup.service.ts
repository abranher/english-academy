import { Injectable } from '@nestjs/common';
import { spawn } from 'node:child_process';
import { readdir } from 'node:fs/promises';

@Injectable()
export class BackupService {
  async createBackup() {
    try {
      const process = spawn('pg_dump', [
        '-h',
        'localhost',
        '-U',
        'postgres',
        '-d',
        'academy',
        '-f',
        '/home/abraham/Proyecto/english-academy/backend/storage/backups/backup.sql',
      ]);

      process.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      process.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      return new Promise((resolve, reject) => {
        process.on('close', (code) => {
          if (code === 0) {
            resolve('Backup realizado correctamente');
          } else {
            reject('Error al realizar el backup');
          }
        });
      });
    } catch (error) {
      console.error('Error al ejecutar pg_dump:', error);
      throw error;
    }
  }

  async findAll(directory: string): Promise<{ name: string }[]> {
    const fileNames = await readdir(directory);
    return fileNames.map((fileName) => ({ name: fileName }));
  }

  findOne(id: number) {
    return `This action returns a #${id} backup`;
  }

  remove(id: number) {
    return `This action removes a #${id} backup`;
  }
}
