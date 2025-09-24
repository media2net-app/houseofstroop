const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixHeroImage() {
  console.log('Fixing hero image...');

  try {
    // Update hero content with working image
    const result = await prisma.heroContent.updateMany({
      where: {
        backgroundImage: {
          startsWith: '/highlights/'
        }
      },
      data: {
        backgroundImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      }
    });

    console.log(`✅ Updated ${result.count} hero content records`);

    // Verify the update
    const heroContent = await prisma.heroContent.findFirst();
    console.log('🎯 Hero Content after update:');
    console.log('Title:', heroContent?.title);
    console.log('Background Image:', heroContent?.backgroundImage);

  } catch (error) {
    console.error('❌ Error fixing hero image:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixHeroImage();
