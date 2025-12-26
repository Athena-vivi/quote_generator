#!/usr/bin/env node

/**
 * 优化示例图片尺寸
 * 生成适合移动端 (448px) 和桌面端 (460px) 的图片
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(process.cwd(), 'public/images/example-background.png');
const outputDir = path.join(process.cwd(), 'public/images');

async function optimizeImages() {
  console.log('🖼️  开始优化示例图片...\n');

  // 检查输入文件是否存在
  if (!fs.existsSync(inputPath)) {
    console.error('❌ 找不到源图片:', inputPath);
    process.exit(1);
  }

  try {
    // 移动端版本 - 448x448
    console.log('📱 生成移动端版本 (448x448)...');
    await sharp(inputPath)
      .resize(448, 448, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 75 })
      .toFile(path.join(outputDir, 'example-background-448.webp'));

    // 移动端 PNG 备份
    await sharp(inputPath)
      .resize(448, 448, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'example-background-448.png'));

    // 桌面端版本 - 460x460
    console.log('🖥️  生成桌面端版本 (460x460)...');
    await sharp(inputPath)
      .resize(460, 460, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 75 })
      .toFile(path.join(outputDir, 'example-background-460.webp'));

    // 桌面端 PNG 备份
    await sharp(inputPath)
      .resize(460, 460, {
        fit: 'cover',
        position: 'center'
      })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'example-background-460.png'));

    // 检查文件大小
    const files = [
      { name: '移动端 WebP', path: path.join(outputDir, 'example-background-448.webp') },
      { name: '移动端 PNG', path: path.join(outputDir, 'example-background-448.png') },
      { name: '桌面端 WebP', path: path.join(outputDir, 'example-background-460.webp') },
      { name: '桌面端 PNG', path: path.join(outputDir, 'example-background-460.png') },
    ];

    console.log('\n✅ 优化完成！文件大小：\n');
    let totalSize = 0;
    for (const file of files) {
      const stats = fs.statSync(file.path);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      console.log(`   ${file.name}: ${sizeKB} KB`);
    }

    console.log(`\n📊 总大小: ${(totalSize / 1024).toFixed(2)} KB`);
    console.log('\n💡 现在可以在代码中使用这些优化后的图片！');

  } catch (error) {
    console.error('❌ 优化失败:', error.message);
    process.exit(1);
  }
}

optimizeImages();
