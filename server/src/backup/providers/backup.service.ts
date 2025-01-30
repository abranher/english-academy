import { Injectable } from '@nestjs/common';
import { spawn } from 'node:child_process';
import { readdir, mkdir } from 'node:fs/promises';
import { format } from 'date-fns';
import { join } from 'node:path';

@Injectable()
export class BackupService {
  async createBackup() {
    try {
      const currentDate = format(new Date(), 'dd_MM_yyyy__HH-mm-ss-aa');
      const backupFileName = `backup_${currentDate}.sql`;
      const backupDirectory = join(process.cwd(), 'storage', 'backups');
      const backupFilePath = join(backupDirectory, backupFileName);

      await mkdir(backupDirectory, { recursive: true });

      const commandProcess = spawn('pg_dump', [
        '-h',
        'localhost',
        '-U',
        'postgres',
        '-d',
        'academy',
        '-f',
        backupFilePath,
      ]);

      commandProcess.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      commandProcess.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      return new Promise((resolve, reject) => {
        commandProcess.on('close', (code) => {
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

  async restoreBackup(fileName: string) {
    const backupDirectory = join(process.cwd(), 'storage', 'backups');
    const backupFilePath = join(backupDirectory, fileName);

    try {
      const commandProcess = spawn('pg_restore', [
        '-d',
        'academy',
        '-U',
        'postgres',
        '-h',
        'localhost',
        '-f',
        backupFilePath,
      ]);

      commandProcess.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      commandProcess.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      return new Promise((resolve, reject) => {
        commandProcess.on('close', (code) => {
          if (code === 0) {
            resolve('Restaurado realizado correctamente');
          } else {
            reject('Error al realizar el Restaurado');
          }
        });
      });
    } catch (error) {
      console.error('Error al restaurar la base de datos:', error);
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} backup`;
  }

  remove(id: number) {
    return `This action removes a #${id} backup`;
  }
}
