const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create hero content
  const heroContent = await prisma.heroContent.upsert({
    where: { id: 'main-hero' },
    update: {},
    create: {
      id: 'main-hero',
      title: 'BUT FIRST COFFEE, WITH A STROOPWAFEL.',
      subtitle: 'Discover authentic, freshly made stroopwafels, delicious coffee to go, and fun workshops in the vibrant Kurá Hulanda Village. Stop by for a sweet treat or join us to learn the art of making your own stroopwafels!',
      backgroundImage: '/highlights/_OP24522.jpg',
      isActive: true
    }
  });

  // Create page content
  const homePageContent = await prisma.pageContent.upsert({
    where: { page: 'home' },
    update: {},
    create: {
      page: 'home',
      title: 'House of Stroop - The First Stroopwafel Shop on Curaçao',
      content: 'THE FIRST STROOPWAFEL SHOP ON CURAÇAO. Discover authentic, freshly made stroopwafels, delicious coffee to go, and fun workshops in the vibrant Kurá Hulanda Village.',
      isActive: true
    }
  });

  // Create Instagram posts
  const instagramPosts = [
    {
      id: 'post-1',
      imageUrl: '/highlights/_OP15078.jpg',
      caption: 'Fresh stroopwafels daily! Made with love in Curaçao 🧇✨',
      permalink: 'https://www.instagram.com/p/example1/',
      isActive: true,
      order: 0
    },
    {
      id: 'post-2',
      imageUrl: '/highlights/_OP14687.jpg',
      caption: 'Perfect coffee & stroopwafel combo ☕ The best way to start your day!',
      permalink: 'https://www.instagram.com/p/example2/',
      isActive: true,
      order: 1
    },
    {
      id: 'post-3',
      imageUrl: '/highlights/_OP14946.jpg',
      caption: 'Behind the scenes at House of Stroop! Our bakers at work 💕',
      permalink: 'https://www.instagram.com/p/example3/',
      isActive: true,
      order: 2
    }
  ];

  for (const post of instagramPosts) {
    await prisma.instagramPost.upsert({
      where: { id: post.id },
      update: {},
      create: post
    });
  }

  console.log('Content seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
