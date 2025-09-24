const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function updateDatabaseWithBlobUrls() {
  console.log('Updating database with Vercel Blob URLs...');

  try {
    // Read uploaded images JSON
    const uploadedImagesPath = path.join(__dirname, '..', 'uploaded-images.json');
    
    if (!fs.existsSync(uploadedImagesPath)) {
      console.log('❌ uploaded-images.json not found. Please run upload-images-to-blob.js first.');
      return;
    }

    const uploadedImages = JSON.parse(fs.readFileSync(uploadedImagesPath, 'utf8'));
    console.log('📋 Found uploaded images:', Object.keys(uploadedImages));

    // Update hero content with _OP24522.jpg
    if (uploadedImages['_OP24522.jpg']) {
      await prisma.heroContent.upsert({
        where: { id: 'hero-main' },
        update: {
          backgroundImage: uploadedImages['_OP24522.jpg']
        },
        create: {
          id: 'hero-main',
          title: 'BUT FIRST COFFEE, WITH A STROOPWAFEL.',
          subtitle: 'Discover authentic, freshly made stroopwafels, delicious coffee to go, and fun workshops in the vibrant Kurá Hulanda Village. Stop by for a sweet treat or join us to learn the art of making your own stroopwafels!',
          backgroundImage: uploadedImages['_OP24522.jpg'],
          isActive: true
        }
      });
      console.log('✅ Updated hero content with Vercel Blob image');
    }

    // Update Instagram posts with the three images
    const instagramImages = [
      { original: '_OP15078.jpg', order: 0 },
      { original: '_OP14687.jpg', order: 1 },
      { original: '_OP14946.jpg', order: 2 }
    ];

    for (const img of instagramImages) {
      if (uploadedImages[img.original]) {
        await prisma.instagramPost.upsert({
          where: { id: `instagram-${img.order}` },
          update: {
            imageUrl: uploadedImages[img.original],
            isActive: true
          },
          create: {
            id: `instagram-${img.order}`,
            imageUrl: uploadedImages[img.original],
            caption: `House of Stroop - Fresh stroopwafels and coffee in Curaçao! 🧇☕ #HouseOfStroop #Stroopwafels #Curaçao #Coffee`,
            permalink: `https://instagram.com/houseofstroop/post-${img.order}`,
            isActive: true,
            order: img.order
          }
        });
        console.log(`✅ Updated Instagram post ${img.order} with Vercel Blob image`);
      }
    }

    console.log('\n🎉 Database updated successfully with Vercel Blob URLs!');
    console.log('🌐 Your live website should now show the correct images.');

  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateDatabaseWithBlobUrls();
