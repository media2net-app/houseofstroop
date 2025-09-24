const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateWithPlaceholderUrls() {
  console.log('Updating database with placeholder Vercel Blob URLs...');

  try {
    // Update hero content with a placeholder Vercel Blob URL
    await prisma.heroContent.upsert({
      where: { id: 'hero-main' },
      update: {
        backgroundImage: 'https://blob.vercel-storage.com/placeholder-hero-bg.jpg'
      },
      create: {
        id: 'hero-main',
        title: 'BUT FIRST COFFEE, WITH A STROOPWAFEL.',
        subtitle: 'Discover authentic, freshly made stroopwafels, delicious coffee to go, and fun workshops in the vibrant Kurá Hulanda Village. Stop by for a sweet treat or join us to learn the art of making your own stroopwafels!',
        backgroundImage: 'https://blob.vercel-storage.com/placeholder-hero-bg.jpg',
        isActive: true
      }
    });
    console.log('✅ Updated hero content with placeholder Vercel Blob URL');

    // Update Instagram posts with placeholder URLs
    const instagramImages = [
      { order: 0, url: 'https://blob.vercel-storage.com/placeholder-instagram-1.jpg' },
      { order: 1, url: 'https://blob.vercel-storage.com/placeholder-instagram-2.jpg' },
      { order: 2, url: 'https://blob.vercel-storage.com/placeholder-instagram-3.jpg' }
    ];

    for (const img of instagramImages) {
      await prisma.instagramPost.upsert({
        where: { id: `instagram-${img.order}` },
        update: {
          imageUrl: img.url,
          isActive: true
        },
        create: {
          id: `instagram-${img.order}`,
          imageUrl: img.url,
          caption: `House of Stroop - Fresh stroopwafels and coffee in Curaçao! 🧇☕ #HouseOfStroop #Stroopwafels #Curaçao #Coffee`,
          permalink: `https://instagram.com/houseofstroop/post-${img.order}`,
          isActive: true,
          order: img.order
        }
      });
      console.log(`✅ Updated Instagram post ${img.order} with placeholder Vercel Blob URL`);
    }

    console.log('\n🎉 Database updated with placeholder Vercel Blob URLs!');
    console.log('📝 Note: These are placeholder URLs. You need to upload real images via the CMS.');

  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWithPlaceholderUrls();
