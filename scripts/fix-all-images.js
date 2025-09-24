const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixAllImages() {
  console.log('Fixing all images in database...');

  try {
    // Update hero content with working image
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
    console.log('✅ Updated hero content with working image');

    // Clear all existing Instagram posts
    await prisma.instagramPost.deleteMany();
    console.log('✅ Cleared existing Instagram posts');

    // Create new Instagram posts with working images
    const instagramPosts = [
      {
        id: 'instagram-0',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        caption: 'Fresh stroopwafels made daily in our kitchen! 🧇✨ #HouseOfStroop #Stroopwafels #Fresh',
        permalink: 'https://instagram.com/houseofstroop/post-0',
        isActive: true,
        order: 0
      },
      {
        id: 'instagram-1',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        caption: 'Perfect coffee to go with your stroopwafel! ☕️ #HouseOfStroop #Coffee #Curaçao',
        permalink: 'https://instagram.com/houseofstroop/post-1',
        isActive: true,
        order: 1
      },
      {
        id: 'instagram-2',
        imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        caption: 'Cozy atmosphere in Kurá Hulanda Village! 🏘️ #HouseOfStroop #Curaçao #Village',
        permalink: 'https://instagram.com/houseofstroop/post-2',
        isActive: true,
        order: 2
      }
    ];

    for (const post of instagramPosts) {
      await prisma.instagramPost.create({
        data: post
      });
      console.log(`✅ Created Instagram post ${post.order} with working image`);
    }

    console.log('\n🎉 All images fixed! Database updated with working URLs.');
    console.log('🌐 Your live website should now show all images correctly.');

  } catch (error) {
    console.error('❌ Error fixing images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllImages();
