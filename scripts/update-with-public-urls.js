const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateWithPublicUrls() {
  console.log('Updating database with public image URLs...');

  try {
    // Update hero content with a public image URL
    await prisma.heroContent.upsert({
      where: { id: 'hero-main' },
      update: {
        backgroundImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      create: {
        id: 'hero-main',
        title: 'BUT FIRST COFFEE, WITH A STROOPWAFEL.',
        subtitle: 'Discover authentic, freshly made stroopwafels, delicious coffee to go, and fun workshops in the vibrant Kurá Hulanda Village. Stop by for a sweet treat or join us to learn the art of making your own stroopwafels!',
        backgroundImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        isActive: true
      }
    });
    console.log('✅ Updated hero content with public image URL');

    // Update Instagram posts with public URLs
    const instagramImages = [
      { 
        order: 0, 
        url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        caption: 'Fresh stroopwafels made daily in our kitchen! 🧇✨ #HouseOfStroop #Stroopwafels #Fresh'
      },
      { 
        order: 1, 
        url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        caption: 'Perfect coffee to go with your stroopwafel! ☕️ #HouseOfStroop #Coffee #Curaçao'
      },
      { 
        order: 2, 
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        caption: 'Cozy atmosphere in Kurá Hulanda Village! 🏘️ #HouseOfStroop #Curaçao #Village'
      }
    ];

    for (const img of instagramImages) {
      await prisma.instagramPost.upsert({
        where: { id: `instagram-${img.order}` },
        update: {
          imageUrl: img.url,
          caption: img.caption,
          isActive: true
        },
        create: {
          id: `instagram-${img.order}`,
          imageUrl: img.url,
          caption: img.caption,
          permalink: `https://instagram.com/houseofstroop/post-${img.order}`,
          isActive: true,
          order: img.order
        }
      });
      console.log(`✅ Updated Instagram post ${img.order} with public image URL`);
    }

    console.log('\n🎉 Database updated with public image URLs!');
    console.log('🌐 Your live website should now show working images.');

  } catch (error) {
    console.error('❌ Error updating database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateWithPublicUrls();
