#!/usr/bin/env node

/**
 * Education and Life Foundation (ELF) - Image Optimization Pipeline
 * - Resizes high-resolution camera exports (caps at 1920px max dimension)
 * - Encodes progressive mozjpeg at 82% quality
 * - Generates high-efficiency WebP counterparts at 80% quality
 * - Strips bulky EXIF metadata
 * - Runs with libvips multi-threading
 */

const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch {
  sharp = require(path.resolve(process.cwd(), 'node_modules/sharp'));
}
sharp.cache(false);

const targetDirs = [
  path.resolve(process.cwd(), 'public/images'),
  path.resolve(process.cwd(), 'src/assets/field')
];

function getFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFiles(full, acc);
    } else if (/\.(jpe?g|png)$/i.test(item.name)) {
      acc.push(full);
    }
  }
  return acc;
}

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const origBuf = fs.readFileSync(filePath);
  const origSize = origBuf.length;

  try {
    const isBoard = filePath.includes('board');
    const maxDim = isBoard ? 800 : 1920;

    const img = sharp(origBuf).rotate();
    const meta = await img.metadata();
    const needsResize = (meta.width && meta.width > maxDim) || (meta.height && meta.height > maxDim);

    let pipeline = sharp(origBuf).rotate();
    if (needsResize) {
      pipeline = pipeline.resize({
        width: maxDim,
        height: maxDim,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      const jpgBuf = await pipeline.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();
      const webpBuf = await pipeline.clone().webp({ quality: 80, effort: 4 }).toBuffer();

      if (jpgBuf.length < origSize || needsResize) {
        fs.writeFileSync(filePath, jpgBuf);
      }

      const webpPath = filePath.substring(0, filePath.length - ext.length) + '.webp';
      fs.writeFileSync(webpPath, webpBuf);

      return { origSize, finalSize: fs.statSync(filePath).size, webpSize: webpBuf.length };
    } else if (ext === '.png') {
      const pngBuf = await pipeline.clone().png({ compressionLevel: 9, effort: 7 }).toBuffer();
      const webpBuf = await pipeline.clone().webp({ quality: 85, effort: 4 }).toBuffer();

      if (pngBuf.length < origSize || needsResize) {
        fs.writeFileSync(filePath, pngBuf);
      }

      const webpPath = filePath.substring(0, filePath.length - ext.length) + '.webp';
      fs.writeFileSync(webpPath, webpBuf);

      return { origSize, finalSize: fs.statSync(filePath).size, webpSize: webpBuf.length };
    }
  } catch (err) {
    return { origSize, finalSize: origSize, webpSize: 0, error: err.message };
  }
}

async function main() {
  console.log('⚡ ELF Image Optimizer running...');
  let files = [];
  for (const d of targetDirs) {
    files = files.concat(getFiles(d));
  }
  console.log(`Auditing ${files.length} images...`);

  let totalOrig = 0;
  let totalFinal = 0;
  let totalWebp = 0;

  for (const f of files) {
    const res = await optimizeFile(f);
    if (res) {
      totalOrig += res.origSize;
      totalFinal += res.finalSize;
      totalWebp += res.webpSize;
    }
  }

  console.log('Done!');
  console.log(`Original total: ${(totalOrig / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalFinal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`WebP counterpart total: ${(totalWebp / (1024 * 1024)).toFixed(2)} MB`);
}

main();
