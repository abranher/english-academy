import { readdir, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { format } from 'date-fns';

@Injectable()
export class BackupService {
  constructor(private readonly config: ConfigService) {}

  async createBackup() {
    try {
      const currentDate = format(new Date(), 'dd_MM_yyyy__HH-mm-ss-aa');
      const backupFileName = `backup_${currentDate}.sql`;
      const backupDirectory = join(process.cwd(), 'storage', 'backups');
      const backupFilePath = join(backupDirectory, backupFileName);

      await mkdir(backupDirectory, { recursive: true });

      const dbHost = this.config.get<string>('DB_HOST');
      const dbPort = this.config.get<number>('DB_PORT');
      const dbDatabase = this.config.get<string>('DB_DATABASE');
      const dbUsername = this.config.get<string>('DB_USERNAME');
      const dbPassword = this.config.get<string>('DB_PASSWORD');

      const command = `PGPASSWORD=${dbPassword} pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUsername} -d ${dbDatabase} -f ${backupFilePath}`;

      const commandProcess = spawn(command, [], { shell: true });

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
            reject(`Error al realizar el backup. Código de salida: ${code}`);
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
    try {
      const backupDirectory = join(process.cwd(), 'storage', 'backups');
      const backupFilePath = join(backupDirectory, fileName);

      const dbHost = this.config.get<string>('DB_HOST');
      const dbPort = this.config.get<number>('DB_PORT');
      const dbDatabase = this.config.get<string>('DB_DATABASE');
      const dbUsername = this.config.get<string>('DB_USERNAME');
      const dbPassword = this.config.get<string>('DB_PASSWORD');

      const command = `PGPASSWORD=${dbPassword} pg_restore -h ${dbHost} -p ${dbPort} -U ${dbUsername} -d ${dbDatabase} -f ${backupFilePath}`;

      const commandProcess = spawn(command, [], { shell: true });

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
            reject(
              `Error al realizar el Restaurado. Código de salida: ${code}`,
            );
          }
        });
      });
    } catch (error) {
      console.error('Error al restaurar la base de datos:', error);
      throw error;
    }
  }
}
