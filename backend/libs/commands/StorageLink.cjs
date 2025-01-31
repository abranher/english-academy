const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path'); // Importa el módulo path

const storagePath = path.join(process.cwd(), 'storage'); // Usa path.join
const publicPath = path.join(process.cwd(), 'public', 'storage'); // Usa path.join

async function createSymbolicLink() {
  try {
    await fs.access(storagePath);

    try {
      const stats = await fs.lstat(publicPath);
      if (stats.isSymbolicLink()) {
        console.log(`El enlace simbólico ${publicPath} ya existe.`);
        // Puedes agregar lógica aquí para forzar la recreación si es necesario
        // await fs.unlink(publicPath); // Descomentar para forzar la recreación
      } else {
        console.log(`Ya existe un archivo/directorio en ${publicPath}.`);
        return; // Ahora el return está dentro de una función
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
