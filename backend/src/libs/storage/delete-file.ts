export async function deleteFile(
  filename: string,
  fileType: 'images' | 'videos' | 'attachments' = 'images',
) {
  const fs = await import('fs/promises');
  const path = await import('path');

  const basePath = path.join(process.cwd(), 'storage', fileType);

  try {
    await fs.unlink(path.join(basePath, filename));
  } catch (err) {
    console.error(`Error eliminando archivo ${filename} de ${basePath}:`, err);
  }
}
