const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCurrentImages() {
  console.log('Checking current images in database...');

  try {
    // Check hero content
    const heroContent = await prisma.heroContent.findFirst();
    console.log('\n🎯 Hero Content:');
    console.log('Title:', heroContent?.title);
    console.log('Background Image:', heroContent?.backgroundImage);

    // Check Instagram posts
    const instagramPosts = await prisma.instagramPost.findMany({
      orderBy: { order: 'asc' }
    });
    console.log('\n📸 Instagram Posts:');
    instagramPosts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.imageUrl}`);
    });

    // Check if images are accessible
    console.log('\n🔍 Testing image accessibility...');
    
    if (heroContent?.backgroundImage) {
      try {
        const response = await fetch(heroContent.backgroundImage);
        console.log(`Hero image (${response.status}): ${heroContent.backgroundImage}`);
      } catch (error) {
        console.log(`Hero image (ERROR): ${heroContent.backgroundImage}`);
      }
    }

    for (const post of instagramPosts) {
      try {
        const response = await fetch(post.imageUrl);
        console.log(`Instagram ${post.order} (${response.status}): ${post.imageUrl}`);
      } catch (error) {
        console.log(`Instagram ${post.order} (ERROR): ${post.imageUrl}`);
      }
    }

  } catch (error) {
    console.error('❌ Error checking images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCurrentImages();
