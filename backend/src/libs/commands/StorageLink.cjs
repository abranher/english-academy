const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');

const storagePath = path.join(process.cwd(), 'storage');
const publicPath = path.join(process.cwd(), 'public', 'storage');

async function createSymbolicLink() {
  try {
    await fs.access(storagePath);

    try {
      const stats = await fs.lstat(publicPath);
      if (stats.isSymbolicLink()) {
        console.log(`El enlace simbólico ${publicPath} ya existe.`);
        // await fs.unlink(publicPath); // Descomentar para forzar la recreación
      } else {
        console.log(`Ya existe un archivo/directorio en ${publicPath}.`);
        return;
      }
    } catch (error) {
      // El enlace simbólico no existe, continuamos
    }

    // Detectar el sistema operativo
    const platform = os.platform();
    let type = 'dir'; // Tipo predeterminado para macOS/Linux

    if (platform === 'win32') {
      type = 'junction'; // 'junction' para Windows
    }

    // Crear el enlace simbólico usando el tipo correcto
    await fs.symlink(storagePath, publicPath, type);

    console.log(`Enlace simbólico creado: ${publicPath} -> ${storagePath}`);
  } catch (error) {
    console.error(`Error al crear el enlace simbólico: ${error}`);
  }
}

createSymbolicLink();
