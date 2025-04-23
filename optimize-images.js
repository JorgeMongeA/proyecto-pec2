// optimize-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


// Directorio de entrada (imágenes originales)
const inputDir = path.join(__dirname, 'src', 'images_original');
// Directorio de salida (imágenes optimizadas)
const outputDir = path.join(__dirname, 'src', 'assets', 'img');

// Verificamos que el directorio de salida exista; si no, lo creamos
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Leemos todos los ficheros del directorio de entrada
fs.readdirSync(inputDir).forEach(file => {
  const inputFile = path.join(inputDir, file);
  const outputFile = path.join(outputDir, file);

  // Comprobamos la extensión para procesar solo imágenes
  if (/\.(jpe?g|png|gif)$/i.test(file)) {
    // sharp puede leer la imagen de inputFile y luego "pipeline" de transformaciones
    sharp(inputFile)
      // redimensionar si queremos un máximo de 1200 px de ancho
      .resize({ width: 1200, withoutEnlargement: true })
      // convertir a JPEG con calidad 80 (reduce peso)
      .jpeg({ quality: 80 })
      // guardamos
      .toFile(outputFile)
      .then(() => {
        console.log(`Procesado: ${file}`);
      })
      .catch(err => {
        console.error(`Error al procesar ${file}:`, err);
      });
  } else {
    console.log(`Omitido (no es imagen): ${file}`);
  }
});

sharp(path.join(inputDir, 'favicon.jpg'))
  .resize(32, 32) // tamaño estándar favicon
  .png()
  .toFile(path.join(outputDir, 'favicon.png'))
  .then(() => console.log('✅ Favicon optimizado: favicon.png'))
  .catch(err => console.error('❌ Error generando favicon', err));
