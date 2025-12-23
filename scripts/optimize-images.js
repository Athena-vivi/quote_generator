/**
 * Image Optimization Script
 * Compresses PNG/JPG images to WebP format with optimized quality
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available, if not use native approach
let sharp;
try {
  sharp = require('../../node_modules/sharp');
} catch (e) {
  console.log('Sharp not found, using native image processing...');
}

const IMAGES_TO_OPTIMIZE = [
  {
    input: './public/images/example-background.png',
    output: './public/images/example-background.webp',
    quality: 75,
    resize: { width: 1200 } // Limit max width
  },
  {
    input: './public/logo.png',
    output: './public/logo.webp',
    quality: 85,
    resize: { width: 64, height: 64 } // Logo should be small
  },
  {
    input: './public/favicon-32x32.png',
    output: './public/favicon-32x32.webp',
    quality: 90,
    resize: { width: 32, height: 32 }
  },
  {
    input: './public/favicon-16x16.png',
    output: './public/favicon-16x16.webp',
    quality: 90,
    resize: { width: 16, height: 16 }
  }
];

async function optimizeImages() {
  if (!sharp) {
    console.error('Sharp is not installed. Please run: npm install sharp --save-dev');
    console.log('Images will be optimized by Next.js Image component at runtime.');
    return;
  }

  console.log('🖼️  Starting image optimization...\n');

  for (const img of IMAGES_TO_OPTIMIZE) {
    try {
      const inputPath = path.resolve(__dirname, img.input);
      const outputPath = path.resolve(__dirname, img.output);

      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Input not found: ${img.input}`);
        continue;
      }

      // Get original size
      const originalStats = fs.statSync(inputPath);
      const originalSize = (originalStats.size / 1024).toFixed(2);

      console.log(`Processing: ${path.basename(img.input)}`);
      console.log(`  Original: ${originalSize} KB`);

      // Process image
      let pipeline = sharp(inputPath);

      // Resize if specified
      if (img.resize) {
        pipeline = pipeline.resize(img.resize.width, img.resize.height, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Convert to WebP
      await pipeline
        .webp({ quality: img.quality, effort: 6 })
        .toFile(outputPath);

      // Get new size
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(`  ✅ WebP: ${newSize} KB (${savings}% reduction)\n`);

    } catch (error) {
      console.error(`❌ Error processing ${img.input}:`, error.message);
    }
  }

  console.log('✨ Image optimization complete!\n');
  console.log('Next steps:');
  console.log('1. Update your components to use next/image');
  console.log('2. Reference .webp files instead of .png');
  console.log('3. Test the images in production build');
}

optimizeImages().catch(console.error);
